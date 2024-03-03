import React, { useEffect, useState } from "react";
import "./MatchHistoryPage.css"; // CSS 파일을 임포트합니다.
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

let historys = [
  {
    id: 1,
    date: "2024-01-22 19:36분",
    meeter: "w99_hyun_",
    gender: "남",
    age: 26,
    location: "서울특별시 마포구",
  },
  {
    id: 2,
    date: "2024-01-16 13:36분",
    meeter: "JIPDANJISUNG",
    gender: "남",
    age: 20,
    location: "서울특별시 서초구",
  },
  {
    id: 3,
    date: "2024-01-10 19:11분",
    meeter: "Woo_Wu_Uk",
    gender: "남",
    age: 23,
    location: "서울특별시 구로구",
  },
];

function MatchHistory() {
  const navigate = useNavigate();
  const isZero = historys.length === 0;
  const [choice, setChoice] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 히스토리 아이템들의 ID를 추적
  const [allDeleteModal, setAllDeleteModal] = useState(false);
  // 특정 아이템을 선택 또는 선택 해제하는 함수

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
    const remainingHistorys = historys.filter(
      (history) => !selectedItems.includes(history.id)
    );
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    historys = remainingHistorys;
    setSelectedItems([]); // 선택된 아이템 초기화
    setChoice(false);
  };
  const deleteAllItems = () => {
    setSelectedItems([]);
    const remainingHistorys = historys.filter((history) =>
      selectedItems.includes(history.id)
    );
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    historys = remainingHistorys;
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
              모든 기록을 삭제하시겠습니까?
            </p>
            <p className="history-modal-text-small">
              삭제하시면 다시 되돌릴 수 없습니다!
            </p>
          </div>
          <div>
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
            historys.map((history) => (
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
                <div>
                  <div className="history-info">
                    <div>
                      <p className="history-date">{history.date} 매칭</p>
                      <p className="history-meeter">{history.meeter}</p>
                      <p className="history-details">
                        {history.gender}/{history.age}/{history.location}
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
        <div className="delete-button">
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
