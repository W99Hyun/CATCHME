import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const InfoBoxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    align-items: center; 
`;

const InfoButton = styled.button`
font-family: 'Noto Sans KR', sans-serif;
  grid-column: 5;
  background: url(${process.env.PUBLIC_URL}/image/info.png) no-repeat;
  background-size: contain;
  width: 30%;
  height: 30%;
  border: none;
  cursor: pointer;
  margin-left: 23px; 
  margin-top: 35px;
  align-self: start;
`;

const customModalStyles = {
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  content: {
    backgroundColor: "rgba(222, 237, 234, 0.98)",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%", 
    height: "47%", 
    borderRadius: "10%",
    opacity: 1,
    boxShadow: "4px 4px 11px 0px rgba(0, 0, 0, 0.22)",
    border: "2px solid",
  },
};

const ModalTitle = styled.h3`
  color: #000;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  span {
    font-size: 11px;
    color: #444444;
  }
`;

const ModalText = styled.p`
  color: #444444;
  text-align: left;
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-items: center;
  margin-top: 5px;
  span {
    font-size: 9px;
    color: #999999;
  }
  flex-direction: column;
  align-items: flex-start; 
`;

const InfoBox = ({ roomName, location, time, meetingnum }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const dateTime = new Date(time);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const day = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const formattedOpenTime = `${year}/${month}/${day}/${hour}:${minute}`;
  const formattedCloseTime = `${year}/${month}/${day+3}/${hour}:${minute}`;

  return (
    <InfoBoxContainer>
      <InfoButton onClick={openModal}></InfoButton>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <ModalTitle>
          <span> CLOSE {formattedCloseTime} </span> <br />
          {roomName}
        </ModalTitle>
        <br /><br /><br />
        <ModalText> 
          {location}
          <br />
          <span> 위치 인증 완료 </span>
        </ModalText>
        <br />
        <ModalText> 방 개설 시간: {formattedOpenTime}</ModalText>
        <br />
        <ModalText> 인원수 : {meetingnum}대{meetingnum}</ModalText>
        <br />
        <ModalText> 회원님의 이상형이 2명 있는 방이에요.</ModalText>
      </Modal>
    </InfoBoxContainer>
  );
};

export default InfoBox;
