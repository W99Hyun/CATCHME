import { all } from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./AlarmPage.css";

const styles = {
  notificationsContainer: {
    display: "grid",
    gridTemplateRows: "0.5fr 7fr",
    marginTop: "10%",
    padding: "2px 20px 20px 20px",
    gap: "5px",
    maxHeight: "75vh",
  },
  notificationsTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 30px 0px 15px",
    textAlign: "center",
  },
  notificationTextNumber: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#433C3C",
  },
  notificationImgContainer: {
    position: "relative",
  },
  notificationImg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  notificationTextDelete: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    fontSize: "10px",
    fontWeight: "",
    color: "#433C3C",
  },
  notificationList: {
    padding: "10px",
    backgroundColor: "rgb(255, 255, 255)",
    border: "0px solid grey",
    borderRadius: "30px",
    overflowY: "auto",
    minHeight: "75vh",
    maxHeight: "75vh",
  },
  notificationItem: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "8px 8px 8px 8px",
    marginBottom: "15px",
    display: "grid",
    minHeight: "60px",
    gridTemplateColumns: "0.1fr 6fr 1fr",
    gap: "10px",
    justifyContent: "space-between",

    minHeight: "8.2vh",
    maxHeight: "20vh",
    boxShadow:
      "3px 15px 15px rgba(0, 0, 0, 0.03), -3px -0px 10px rgba(0, 0, 0, 0.03)", // 그림자 효과 추가
  },
  alignItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationEmpty: {
    textAlign: "center",
    marginTop: "8%",
    fontSize: "16px",
    color: "#cccbcb",
  },
  alarmHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0px 0px 0px 29px",
  },
  time: {
    color: "#666666",
    fontSize: "12px",
    textAlign: "center",
  },
  alarmText: {
    fontSize: "25px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "rgb(60, 57, 57)",
    textAlign: "center",
  },
  alarmContent: {
    margin: "12px 0px",
  },
};
function AlarmItem({ notification, onDelete }) {
  const [style, setStyle] = useState(styles.notificationItem);
  const [data, setData] = useState([]);

  const timeShow = function (timeStamp) {
    const now = new Date().getTime(); // 현재 시간의 타임스탬프
    const difference = now - timeStamp; // 현재 시간과 주어진 타임스탬프와의 차이

    // 타임스탬프를 분, 시간, 일로 변환
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (difference < 60000) {
      // 1분 이내
      return "지금";
    } else if (difference < 3600000) {
      // 1분 ~ 60분 이내
      return `${minutes}분 전`;
    } else if (difference < 86400000) {
      // 1시간 ~ 24시간 이내
      return `${hours}시간 전`;
    } else if (difference < 2678400000) {
      // 1일 ~ 31일 이내
      return `${days}일 전`;
    } else {
      // 31일 이후
      return "오래 전";
    }
  };

  let touchStartX = 0;
  let touchCurrentX = 0;

  function handleTouchStart(e) {
    touchStartX = e.targetTouches[0].clientX;
    // Set the style to be able to move horizontally
    setStyle({
      ...styles.notificationItem,
      transition: "none", // Disable transitions to follow finger immediately
    });
  }

  function handleTouchMove(e) {
    touchCurrentX = e.targetTouches[0].clientX;
    const moveX = touchCurrentX - touchStartX;

    // Update the style to move with the touch
    setStyle({
      ...styles.notificationItem,
      transform: `translateX(${moveX}px)`,
      transition: "", // Disable transitions to follow finger immediately
    });
  }

  function handleTouchEnd() {
    const moveX = touchCurrentX - touchStartX;

    if (moveX > 50) {
      swipeFunction();
    }

    // Reset the style regardless of the swipe distance
    setStyle(styles.notificationItem);
    touchStartX = 0;
    touchCurrentX = 0;
  }

  function swipeFunction() {
    onDelete([notification.id]);
  }

  return (
    <div
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Notification content */}

      <div className="dot-container">
        {notification.readed ? null : (
          <img
            src={`${process.env.PUBLIC_URL}/image/alarm/alarmCheck.png`}
            alt="check"
          />
        )}
      </div>
      <p style={{ ...styles.alarmContent, ...styles.alignItem }}>
        {notification.notice}
      </p>
      <span style={{ ...styles.time, ...styles.alignItem }}>
        {timeShow(new Date(notification.created_at).getTime())}
      </span>
    </div>
  );
}

function Alarm() {
  const [allDeleteModal, setAllDeleteModal] = useState(false); //m
  const [notifications, setNotifications] = useState([]);
  const [render, setRender] = useState(false);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(
          "https://api.catchmenow.co.kr/main/csrf/",
          {
            method: "GET",
            credentials: "include", // 필요에 따라 설정하세요. 예: 쿠키를 전송하기 위해 include를 사용합니다.
          }
        );

        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    // 데이터를 가져오는 함수를 정의합니다.
    const fetchData = async () => {
      try {
        // fetch를 사용하여 데이터를 가져옵니다.
        const response = await fetch(
          "https://api.catchmenow.co.kr/main/api/user_info/1001/notice/"
        );

        // response에서 JSON 데이터를 추출합니다.
        const jsonData = await response.json();

        // 가져온 데이터를 상태에 설정합니다.
        setNotifications(jsonData.notice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
    fetchData();
    console.log(notifications.notice);
    // clean-up 함수를 반환하여 컴포넌트가 언마운트될 때 이전에 설정한 데이터 요청을 취소합니다.
    return () => {
      // clean-up 작업을 수행합니다.
    };
  }, [render]); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const isZero = notifications.length === 0;
  // 읽지 않은 알림의 개수를 계산합니다.
  const notRead = notifications.reduce(
    (count, notification) => count + (notification.readed ? 0 : 1),
    0
  );

  // 알림을 삭제하는 함수
  const deleteNotification = (idsToUpdate) => {
    fetch("https://api.catchmenow.co.kr/main/api/user_info/1001/notice/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ ids: idsToUpdate }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("수정 요청이 실패했습니다.");
        }
        console.log("수정 요청이 성공했습니다.");
        setRender((prevRender) => !prevRender);
      })
      .catch((error) => {
        console.error("수정 요청이 실패했습니다:", error);
      });
  };

  const deleteAllNotice = (notices) => {
    // readed가 false인 id를 추출합니다.
    const allIds = notices.map((notice) => notice.id);
    // 추출한 id들을 서버로 보내어 수정 요청을 합니다.

    deleteNotification(allIds);
  };

  const handleUpdateNotices = (notices) => {
    // readed가 false인 id를 추출합니다.
    const unreadIds = notices
      .filter((notice) => !notice.readed)
      .map((notice) => notice.id);
    // 추출한 id들을 서버로 보내어 수정 요청을 합니다.
    console.log(unreadIds);
    updateNotices(unreadIds);
  };

  const updateNotices = (idsToUpdate) => {
    fetch("https://api.catchmenow.co.kr/main/api/user_info/1001/notice/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ ids: idsToUpdate }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("수정 요청이 실패했습니다.");
        }
        console.log("수정 요청이 성공했습니다.");
        setRender((prevRender) => !prevRender);
      })
      .catch((error) => {
        console.error("수정 요청이 실패했습니다:", error);
      });
  };

  return (
    <div>
      <Modal
        isOpen={allDeleteModal}
        onRequestClose={() => setAllDeleteModal(false)}
        className="alarmpage-modal-detail"
      >
        <div className="alarmpage-modal-container">
          <div>
            <p className="alarmpage-modal-text">모든 알람을 삭제할까요?</p>
          </div>
          <div>
            <button
              onClick={() => {
                setNotifications([]);
                setAllDeleteModal(false);
              }}
              className="alarmpage-modal-buttons"
            >
              삭제
            </button>
            <button
              onClick={() => setAllDeleteModal(false)}
              className="alarmpage-modal-buttons"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
      <div style={styles.alarmHeader}>
        <span style={styles.alarmText}>알림</span>
      </div>
      <div style={styles.notificationsContainer}>
        <div style={styles.notificationsTextContainer}>
          <span style={styles.notificationTextNumber}>
            <span>{`읽지 않은 알람 ${notRead}개`}</span>
            <span className="my-span">
              {notRead ? (
                <img
                  src={`${process.env.PUBLIC_URL}/image/alarm/alarmCheck.png`}
                  className="my-img"
                  alt="check"
                />
              ) : null}
            </span>
          </span>
          <span
            style={styles.notificationTextDelete}
            onClick={() => deleteAllNotice(notifications)} //setAllDeleteModal(true)
          >
            전체 삭제
          </span>
        </div>
        <div style={styles.notificationList}>
          {!isZero ? (
            notifications.map((notification) => (
              <AlarmItem
                key={notification.id}
                notification={notification}
                onDelete={deleteNotification}
              />
            ))
          ) : (
            <div style={styles.notificationEmpty}>현재 알림이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alarm;

//원래코드.
// import React from "react";
// import Header from "../Component/Header";
// import "./AlarmPage.css"; // CSS 파일을 임포트합니다.
// import { useNavigate } from "react-router-dom";
// <div className="withfriends-header">
//   <span className="withfriends-text">매칭 목록</span>
// </div>;
// const notifications = [
//   {
//     id: 1,
//     message: "___eve 님의 이상형과 76% 일치하는 사람이 활동중이에요.",
//     time: "지금",
//   },
//   { id: 2, message: "3,000 코인 충전이 완료되었습니다.", time: "1분 전" },
//   {
//     id: 3,
//     message: "___eve 님의 이상형과 43% 일치하는 사람이 활동중이에요.",
//     time: "20분 전",
//   },
//   {
//     id: 4,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 5,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 6,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 7,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 8,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 9,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 10,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 11,
//     message: "___eve 님의 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
//   {
//     id: 12,
//     message: "das 이상형과 98% 일치하는 사람이 활동중이에요.",
//     time: "25분 전",
//   },
// ];

// function Alarm() {
//   const isZero = notifications.length === 0;
//   const notRead = 2;
//   return (
//     <div>
//       <Header />
//       <div className="alarm-header">
//         <span className="alarm-text">알림</span>
//       </div>
//       <div className="notifications-container">
//         <div className="notifications-text-container">
//           <span className="notification-text-number">{`읽지 않은 알람 ${notRead}개`}</span>
//           <span className="notification-text-delete">전체 삭제</span>
//         </div>
//         <div className="notification-list">
//           {!isZero
//             ? notifications.map((notification) => (
//                 <div key={notification.id} className="notification-item">
//                   <p>{notification.message}</p>
//                   <span className="time">{notification.time}</span>
//                 </div>
//               ))
//             : "현재 알림이 없습니다."}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Alarm;

//이제부터 css
/* .notifications-container {
  display: grid;
  grid-template-rows: 0.5fr 7fr;
  margin-top: 10%;
  padding: 2px 20px 20px 20px;
  gap: 5px;
  max-height: 75vh;
}
.notifications-text-container {
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 0px 15px;
}
.notification-text-number {
  font-size: 12px;
  font-weight: lighter;
}

.notification-text-delete {
  font-size: 10px;
  font-weight: lighter;
}

.notification-list {
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  overflow-y: auto;
  min-height: 63vh;
  max-height: 63vh;
}
.notification-item {
  background: #ffffff;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 8px;
  display: grid;
  min-height: 60px;
  grid-template-columns: 6fr 1fr;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

.notification-item p {
  margin: 0;
  color: #333333;
}

.alarm-header {
  display: flex;
  align-items: center;
  padding: 16px;
}

.header button {
  margin-right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.time {
  color: #666666;
  font-size: 12px;
}

.alarm-text {
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  color: rgb(60, 57, 57);
  text-align: center;
} */
