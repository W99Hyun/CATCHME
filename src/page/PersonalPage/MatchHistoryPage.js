import React, { useEffect, useState } from "react";
import "./MatchHistoryPage.css"; // CSS 파일을 임포트합니다.
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

function MatchHistory() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 히스토리 아이템들의 ID를 추적
  const [allDeleteModal, setAllDeleteModal] = useState(false);

  const [historys, setHistorys] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

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

  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.catchmenow.co.kr/main/api/user_info/1001/matching_history/"
        );
        const jsonData = await response.json();
        setHistorys(jsonData.matching_history);

        // 매칭된 사용자 정보를 모아놓을 배열
        const usersData = [];

        // 매칭된 사용자 정보를 가져오기 위한 Promise 배열
        const fetchPromises = jsonData.matching_history.map(async (history) => {
          try {
            const userResponse = await fetch(
              `https://api.catchmenow.co.kr/main/api/user_info/${history.matched_user}/`
            );
            const userData = await userResponse.json();
            userData.id = history.id;
            usersData.push(userData);
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        });

        // 모든 Promise가 완료될 때까지 기다린 후, matchedUsers 상태를 업데이트합니다.
        await Promise.all(fetchPromises);
        usersData.sort((a, b) => b.id - a.id);
        setMatchedUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [render]);

  const deleteHistory = (idsToDelete) => {
    fetch(
      "https://api.catchmenow.co.kr/main/api/user_info/1001/matching_history/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ ids: idsToDelete }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("수정 요청이 실패했습니다.");
        }
        console.log("삭제 요청이 성공했습니다.");
        setRender((prevRender) => !prevRender);
      })
      .catch((error) => {
        console.error("수정 요청이 실패했습니다:", error);
      });
  };

  const isZero = historys.length === 0;
  const toggleSelectedItem = function (id) {
    if (selectedItems.includes(id)) {
      // 이미 선택된 아이템인 경우 선택 해제
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      // 선택되지 않은 아이템인 경우 선택
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelectedItems = () => {
    const remainingHistorys = historys
      .filter((history) => selectedItems.includes(history.id))
      .map((history) => history.id);
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    deleteHistory(remainingHistorys);
    console.log(remainingHistorys);
    setSelectedItems([]); // 선택된 아이템 초기화
    setChoice(false);
  };
  const deleteAllItems = () => {
    setSelectedItems([]);
    const remainingHistorys = historys.map((history) => history.id);
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    deleteHistory(remainingHistorys);
    setSelectedItems([]); // 선택된 아이템 초기화
  };
  // 버튼의 클래스 설정을 isActive 상태에 따라 변경
  //const buttonClass = isActive ? "choice-button-active" : "choice-button";

  return (
    <div>
      <Modal
        isOpen={allDeleteModal}
        onRequestClose={() => setAllDeleteModal(false)}
        className="alarmpage-modal-detail"
      >
        <div className="alarmpage-modal-container">
          <div className="alarmpage-modal-text">
            <div>
              <p className="history-modal-text-big">
                모든 기록을 삭제하시겠습니까?
              </p>
              <p className="history-modal-text-small">
                삭제하시면 다시 되돌릴 수 없습니다!
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                deleteAllItems();
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

      <div className="header-history">
        <span className="history-text">매칭 목록</span>
      </div>
      <div className="button-select-delete-locate">
        <button className="select-button" onClick={() => setChoice(true)}>
          선택
        </button>
        {choice ? (
          <button
            className="delete-all-button"
            onClick={() => setChoice(false)} //setSelectItems([])필요
          >
            취소
          </button>
        ) : (
          <button
            className="delete-all-button"
            onClick={() => setAllDeleteModal(true)}
          >
            전체 삭제
          </button>
        )}
      </div>
      <div className="history-container">
        <div className="history-list">
          {!isZero ? (
            matchedUsers.map((history) => (
              <div key={history.id} className="history-item">
                <div className="choice-button-locate">
                  {choice ? (
                    <button
                      className={
                        selectedItems.includes(history.id)
                          ? "choice-button-active"
                          : "choice-button"
                      }
                      onClick={() => toggleSelectedItem(history.id)}
                    ></button>
                  ) : null}
                </div>
                <div className="middle-sort">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                    className=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div className="history-info">
                  <div>
                    <div>
                      <p className="history-date">{null} 어제 매칭</p>
                      <p className="history-meeter">
                        KAKAO ID: {history.extra_info[0].nickname}
                      </p>
                      <p className="history-details">
                        {history.ismale ? "남자" : "여자"}/
                        {history.extra_info[0].age}/
                        {history.extra_info[0].school}{" "}
                        {history.extra_info[0].major}
                        {/* {history[0].ismale}/{history[0].extra_info[0].age}/
                        {history[0].extra_info[0].major} */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="middle-sort">
                  <button className="report-button">신고하기</button>
                </div>
              </div>
            ))
          ) : (
            <div className="history-empty-text">매칭 기록이 없습니다.</div>
          )}
        </div>
        <div className="delete-button-loc">
          {choice ? (
            <button className="delete-button" onClick={deleteSelectedItems}>
              삭제하기
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MatchHistory;
