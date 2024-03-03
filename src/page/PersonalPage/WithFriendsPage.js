import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./WithFriendsPage.css";

let friends = [
  {
    id: 1,
    nickname: "w98_hyun_",
    gender: "남",
    age: "26",
    locate: "강남구 ",
  },
  {
    id: 2,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
  {
    id: 3,
    nickname: "w99_hyun_",
    gender: "남",
    age: "26",
    locate: "강남구 ",
  },
  {
    id: 4,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
  {
    id: 5,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
];

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #f0f0f0",
  },
  withfriendsHeader: {
    padding: "0px 0px 0px 29px",
  },
  withfriendsText: {
    fontSize: "25px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "rgb(60, 57, 57)",
    textAlign: "center",
  },

  friendInfo: {},
  friendNickname: {
    marginLeft: "5px",
    fontWeight: "900",
    fontSize: "20px",
  },
  friendLevel: {
    marginLeft: "5px",
    color: "#313131",
    fontSize: "16px",
  },
  friendDetails: {
    marginLeft: "5px",
    color: "#313131",
    fontSize: "11px",
  },
  gogo: {
    fontSize: "30px",
  },
  simplePlusButton: {
    fontSize: "12px",
    width: "96px",
    height: "32px",
    backgroundColor: "#fbfbfb",
    fontWeight: "bold",
    color: "#8e8e8e",
    textAlign: "center",
    borderRadius: "10px",
    border: "0.2px solid rgb(213, 213, 213)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
  },
  kakaoButton1: {
    display: "block",
    margin: "auto",
    marginTop: "5%",
    width: "330px",
    height: "50px",
    color: "#391b1b",
    fontWeight: "bold",
    fontSize: "16px",
    backgroundColor: "#fee500",
    border: "none",
    borderRadius: "10px",
  },
  withfriendsNoFriends: {
    textAlign: "center",
    marginTop: "8%",
    fontSize: "16px",
    color: "#cccbcb",
  },
};
const modalStyles = {
  overlay: {
    backgroundColor: "transparent", //주변 음영 지우기
  },
};

function WithFriends() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [choice, setChoice] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 히스토리 아이템들의 ID를 추적
  const [allDeleteModal, setAllDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [locate, setLocate] = useState("");
  const [animal, setAnimal] = useState("");
  const [univ, setUniv] = useState("");
  const [body, setBody] = useState("");

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

  const [friends, setFriends] = useState([]);
  const [gender, setGender] = useState("");
  useEffect(() => {
    // 데이터를 가져오는 함수를 정의합니다.
    const fetchData = async () => {
      try {
        // fetch를 사용하여 데이터를 가져옵니다.
        const response = await fetch(
          "https://api.catchmenow.co.kr/main/api/user_info/1001/"
        );

        // response에서 JSON 데이터를 추출합니다.
        const jsonData = await response.json();

        // 가져온 데이터를 상태에 설정합니다.
        setFriends(jsonData.extra_info[0].menPartys);
        setGender(jsonData.ismale);
        console.log(friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
    fetchData();
    // clean-up 함수를 반환하여 컴포넌트가 언마운트될 때 이전에 설정한 데이터 요청을 취소합니다.
    return () => {
      // clean-up 작업을 수행합니다.
    };
  }, [render]);

  const deleteFriend = (idsToUpdate) => {
    fetch("https://api.catchmenow.co.kr/main/api/user_info/1001/", {
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
        console.log("삭제 요청이 성공했습니다.");
        setRender((prevRender) => !prevRender);
      })
      .catch((error) => {
        console.error("수정 요청이 실패했습니다:", error);
      });
  };

  let index = friends.length;
  const handleRegister = () => {
    // 콘솔에 값들을 출력
    const addFriend = {
      id: ++index,
      nickname: name,
      gender: "남",
      age: age,
      locate: locate,
    };
    console.log("이름:", name);
    console.log("나이:", age);
    console.log("거주지:", locate);
    console.log("닮은 동물 상:", animal);
    console.log("대학/학과:", univ);
    console.log("키/체형:", body);
    setModalIsOpen(false);

    friends.push(addFriend);
    setName(null);
    setAge(null);
    setAnimal(null);
    setLocate(null);
    setUniv(null);
    setBody(null);
  };

  const navigate = useNavigate();
  const simpleFriendPlus = function () {
    setModalIsOpen(true);
  };

  const toggleSelectedItem = function (id) {
    if (selectedItems.includes(id)) {
      // 이미 선택된 아이템인 경우 선택 해제
      setSelectedItems(selectedItems.filter((item) => item !== id));
      console.log(selectedItems);
    } else {
      // 선택되지 않은 아이템인 경우 선택
      setSelectedItems([...selectedItems, id]);
      console.log(selectedItems);
    }
  };

  const deleteSelectedItems = () => {
    const remainingFriends = friends
      .filter((friend) => !selectedItems.includes(friend.id))
      .map((friend) => friend.id);
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    deleteFriend(remainingFriends);
    setSelectedItems([]); // 선택된 아이템 초기화
    setChoice(false);
  };
  const deleteAllItems = () => {
    const remainingFriends = friends.map((friend) => friend.id);
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    deleteFriend(remainingFriends);
    setSelectedItems([]); // 선택된 아이템 초기화
  };
  // 버튼의 클래스 설정을 isActive 상태에 따라 변경
  //const buttonClass = isActive ? "choice-button-active" : "choice-button";

  return (
    <div>
      <Modal
        isOpen={allDeleteModal}
        onRequestClose={() => setAllDeleteModal(false)}
        className="history-modal-detail"
      >
        <div className="history-modal-container">
          <div>
            <p className="history-modal-text-big">
              모든 친구를 삭제하시겠습니까?
            </p>
            <p className="history-modal-text-small">
              친구를 삭제해도 다시 등록할 수 있어요!
            </p>
          </div>
          <div className="history-modal-buttons-container">
            <button
              onClick={() => {
                deleteAllItems();
                setAllDeleteModal(false);
              }}
              className="history-modal-buttons"
            >
              삭제
            </button>
            <button
              onClick={() => setAllDeleteModal(false)}
              className="history-modal-buttons"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Modal"
        style={modalStyles}
        className="sfp-detail"
      >
        <div className="sfp-container">
          <div className="sfp-sfp">간편 친구 추가</div>
          <div className="sfp-info-container">
            <div className="sfp-info-holder">
              <span>이름:</span>
              <input
                id="name"
                type="text"
                placeholder=" ex) 홍길동"
                className="sfp-name-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sfp-info-age-locate-container">
              <div className="sfp-info-holder">
                <span>나이:</span>
                <input
                  id="age"
                  type="number"
                  placeholder=" ex) 21"
                  className="sfp-age-input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="sfp-info-holder">
                <span>거주지:</span>
                <input
                  id="locate"
                  type="text"
                  placeholder=" ex) 마포구"
                  className="sfp-locate-input"
                  onChange={(e) => setLocate(e.target.value)}
                />
              </div>
            </div>
            <div className="sfp-info-holder">
              <span>닮은 동물 상:</span>
              <input
                id="animal"
                type="text"
                placeholder=" ex) 펭귄상"
                className="sfp-animal-input"
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>
            <div className="sfp-info-holder">
              <span>대학/학과:</span>
              <input
                id="univ"
                type="text"
                placeholder=" ex) 홍익대 / 컴퓨터공학과"
                className="sfp-univ-input"
                onChange={(e) => setUniv(e.target.value)}
              />
            </div>
            <div className="sfp-info-holder">
              <span>키/체형:</span>
              <input
                id="body"
                type="text"
                placeholder=" ex) 150 / 통통"
                className="sfp-body-input"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
          <div>
            <span>
              <button onClick={handleRegister} className="sfp-regist-button">
                등록하기
              </button>
            </span>
            <span>
              <button
                onClick={() => setModalIsOpen(false)}
                className="sfp-cancel-button"
              >
                취소
              </button>
            </span>
          </div>
        </div>
      </Modal>
      <div style={styles.withfriendsHeader}>
        <div>
          <span style={styles.withfriendsText}>친구목록</span>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div></div>
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
            onClick={() => setAllDeleteModal(true)} //deleteAllItems
          >
            전체 삭제
          </button>
        )}
      </div>
      <div className="withfriendsContainer ">
        <div className="friendsList">
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} className="friends-item">
                <div className="btn-location">
                  {choice ? (
                    <div className="btn-location">
                      <button
                        className={
                          selectedItems.includes(friend.id)
                            ? "choice-button-active"
                            : "choice-button"
                        }
                        onClick={() => toggleSelectedItem(friend.id)}
                      ></button>
                    </div>
                  ) : null}
                </div>
                <div className="mypage-myinfo-img-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                    alt=""
                    className="withfriends-myinfo-img"
                  />
                </div>
                <div style={styles.friendInfo} className="align-item">
                  <span>
                    <span style={styles.friendNickname}>
                      {friend.nickname}님<br />
                    </span>

                    <span style={styles.friendDetails}>
                      {gender ? "남" : "여"} / {friend.age} / {friend.school}{" "}
                      {friend.major}
                    </span>
                  </span>
                </div>
                <div className="withfriends-myinfo-modify-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/personalpage/personalarrow.png`}
                    alt="arrow-btn"
                  />
                </div>
              </div>
            ))
          ) : (
            <div style={styles.withfriendsNoFriends}>
              아직 등록된 친구가 없어요. <br />
              카카오톡으로 간편하게 등록하세요.
            </div>
          )}
        </div>
        <div>
          {choice ? (
            <div className="delete-button">
              <button className="delete-button" onClick={deleteSelectedItems}>
                삭제하기
              </button>
            </div>
          ) : (
            <div className="sfp-button-loc">
              <button
                style={styles.simplePlusButton}
                onClick={simpleFriendPlus}
                className="fontfamily"
              >
                간편친구추가
              </button>
            </div>
          )}
        </div>
        <div>
          <button style={styles.kakaoButton1} className="fontfamily">
            <div>카카오톡으로 초대하기</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithFriends;
