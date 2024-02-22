import {React, useState} from "react";
import Modal from "react-modal";
import {styled} from "styled-components";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  content: {
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0, // 내부 패딩 없애기
    width: "95%", // 화면 너비만큼
    height: "35%", // 화면 높이만큼
    borderRadius: "18px",
    border: "none",
    background: "#FFF",
    boxShadow: "0px 0px 22px 0px rgba(0, 0, 0, 0.08)",
    display: "grid",
    gridTemplateRows: "repeat(4, 1fr)",
    gap: "5px",
    transition: "opacity 1s",
  },
  dayText: {
    gridColumn: "1", // DAY 1을 그리드의 첫 번째 열에 배치
    textAlign: "center", // 가운데 정렬
    fontSize: "24px", // 원하는 폰트 크기로 조절
    fontWeight: "bold", // 원하는 글꼴 굵기로 조절
    margin: "auto", // 세로 가운데 정렬
    color: "#DA8BAC",
  },
};

const ConfirmText1 = styled.div`
  color: #474747;
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  width: 100%;
  height: 40%;
  margin: 15px auto 5px;
`;

const ConfirmText2 = styled.div`
  color: #474747;
  text-align: center;
  font-size: 17px;
  font-weight: 900;
  width: 100%;
  height: 40%;
  margin: auto;
  span {
    color: #D1CC50;  // 노란색으로 변경
  }
`;

const ConfirmButton = styled.button`
font-family: 'Noto Sans KR', sans-serif;
  width: 20%;
  height: 30%;
  border-radius: 9px;
  background: #E296B6;
  color: white;
  border: none;
  cursor: pointer;
  margin: 20px auto;
`;

const ReadyConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleConfirm = () => {
    setIsFadingOut(true); // 투명도 전환 효과 시작
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 1000); // 0.5초 후에 onConfirm 및 onClose 호출
  };

  return (
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onClose} 
    style={{ ...customStyles, content: { ...customStyles.content, opacity: isFadingOut ? 0 : 1 } }}
    >
      <div style={customStyles.dayText}>DAY 1</div>
      <ConfirmText1>
        이성 선택의 시간이에요. 
        <br /> 
        마음에 드는 이성을 선택하세요.
      </ConfirmText1>
      <ConfirmText2>
        서로 선택을 하면 <span> 카톡 아이디</span>가 공유돼요!
      </ConfirmText2>
      <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
    </Modal>
  );
};

export default ReadyConfirmModal;
