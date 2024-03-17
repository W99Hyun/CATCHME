import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from 'axios';

const RoomSearchModal = ({ isOpen, onClose, onSearchComplete }) => {
  const [roomTitle, setRoomTitle] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.get(`https://api.catchmenow.co.kr/room/api/room_info/?kw=${roomTitle}`)
      .then(response => {
        onSearchComplete(response.data);
        onClose();
        setRoomTitle("");
      })
      .catch(error => {
        console.error('Error searching rooms:', error);
        alert('방 검색에 실패했습니다.');
      });
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  return isOpen ? (
    <ModalWrapper onClick={handleCloseModal}>
      <ModalContent ref={modalRef}>
        <RoomForm onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
            required
            maxLength={15}
            placeholder="방 제목을 입력하세요"
            hasValue={roomTitle.length > 0}
            onKeyDown={handleKeyDown} // 엔터 키 입력 감지
          />
        </RoomForm>
      </ModalContent>
    </ModalWrapper>
  ) : null;
};

export default RoomSearchModal;


const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #FFFFFF;
  padding: 1.5rem;
  border:none;
  border-radius: 32px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const RoomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'SUITE';
  outline: none;
  background-color: #FFFFFF;
  ::placeholder {
    color: white;
  }
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4756D9;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;

  &:hover {
    background-color: #3a47ad;
  }
`;
