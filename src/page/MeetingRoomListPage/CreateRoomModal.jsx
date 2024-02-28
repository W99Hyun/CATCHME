import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';



const CreateRoomModal = ({ isOpen, onClose, onCreateRoom }) => {
  const [roomTitle, setRoomTitle] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [eachMatch, setEachMatch] = useState(1); //디폴트 1:1임


  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.get('https://api.catchmenow.co.kr/main/csrf')
      .then(response => {
        const csrfToken = response.data.csrfToken; 
  
        const roomData = { rname: roomTitle, location: roomLocation, each_match: eachMatch };
        console.log(roomData);
        axios.post('https://api.catchmenow.co.kr/room/api/room_info/', roomData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        })

        .then(response => {
          console.log('Room created:', response.data);
          onCreateRoom(response.data); 
          onClose();                  
          setRoomTitle("");           
          setRoomLocation("");
          setEachMatch(1);
        })
        .catch(error => {
          console.error('Error creating room:', error);
          alert('방 생성이 제대로 안되네옹');
        });
      })
      .catch(error => {
        console.error('CSRF 토큰 가져오기 실패:', error);
        alert('CSRF 토큰을 가져오는데 실패했습니다.');
      });
  };

  return isOpen ? (
    <ModalWrapper>
      <ModalContent>
      <ModalHeader>
          <TitleAndCloseButtonContainer>
            <h2 style={{color:"#444444", fontSize:'25px'}}>방 만들기</h2>
            <CloseButton onClick={onClose}>X</CloseButton>
          </TitleAndCloseButtonContainer>
          
          <p style={{color:"#B7B7B7", marginTop:'-20px', fontSize:'14px', marginLeft:'2px'}}>방은 생성 후 3일 뒤 자동으로 삭제됩니다 !</p>
        <img src="./image/MeetingRoomList/Group233.png"
        alt="Description"
        style={{width:"134px", height:"123px" ,marginLeft:'80px'}}/>
        </ModalHeader>
        <RoomForm onSubmit={handleSubmit}>

          <InputBox>
          <InputField
           type="text"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
           required
           maxLength={15}
           placeholder="방의 제목을 입력하세요 (15자 이내)"
           hasValue={roomTitle.length > 0}
          />
          </InputBox>
          <InputBox>
            <InputField
              type="text"
              value={roomLocation}
              onChange={(e) => setRoomLocation(e.target.value)}
              required
              maxLength={7} // 최대 7자로 제한
              placeholder="선호하는 위치를 입력하세요. ex) 홍대, 강남"
              hasValue={roomLocation.length > 0}
           />
          </InputBox>
          <MatchTypeOptions>
  <label>
    <input
      type="radio"
      name="eachMatch"
      value="1"
      checked={eachMatch === 1}
      onChange={(e) => setEachMatch(parseInt(e.target.value, 10))}
    />
    1:1
  </label>
  <label>
    <input
      type="radio"
      name="eachMatch"
      value="2"
      checked={eachMatch === 2}
      onChange={(e) => setEachMatch(parseInt(e.target.value, 10))}
    />
    2:2
  </label>
  <label>
    <input
      type="radio"
      name="eachMatch"
      value="3"
      checked={eachMatch === 3}
      onChange={(e) => setEachMatch(parseInt(e.target.value, 10))}
    />
    3:3
  </label>
  <label>
    <input
      type="radio"
      name="eachMatch"
      value="4"
      checked={eachMatch === 4}
      onChange={(e) => setEachMatch(parseInt(e.target.value, 10))}
    />
    4:4
  </label>
</MatchTypeOptions>

          <SubmitButton type="submit">생성하기</SubmitButton>
        </RoomForm>
      </ModalContent>
    </ModalWrapper>
  ) : null;
};

export default CreateRoomModal;
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
  width: 363px;
  background-color: #F8F8F8;
  padding: 2rem;
  border: 2px solid #444444;
  border-radius: 32px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 20rem;
`;

const ModalHeader = styled.div`
display: flex;
  flex-direction: column; // 방향을 세로로 변경
  align-items: flex-start; // 세로 정렬 시작점
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #444444;
`;
const RoomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; 
`;

const InputBox = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 308px;
  margin-top: 24px;
  margin-bottom: -24px;
  height: 46px;
  background-color: #FBFBFB;
  border: none;
  color: #4756D9;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  padding-top: 10px;
  padding-bottom: 5px;
  border: none;
  border-bottom: 1px solid ${props => props.hasValue ? '#4756D9' : '#ccc'}; // 값이 있으면 파란색, 없으면 회색
  color: #4756D9;
  outline: none; 
  font-size:10px;
  font-family: "SUITE", sans-serif;
  background-color: transparent; 
  width: 88%;
  box-sizing: border-box;

  ::placeholder {
    color: #4756D9; 
  }

  &:not([type="file" i], [type="image" i], [type="checkbox" i], [type="radio" i]) {
    display: inline-block;
  }
`;

const SubmitButton = styled.button`
  background-color: transparent; 
  color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #444444;
  border-radius: 29px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 90px;
  font-size: 14px;
  font-weight: 900;
  height: 27px;
  margin-top:19px;
  transition: background-color 0.2s;
  font-family: Arial, sans-serif; 
  &:active {
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.15);
    transform: scale(0.95);  
  }
`;


const TitleAndCloseButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%; 
`;
const MatchTypeOptions = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center;
  margin-top: 35px;
  label {
    display: flex;
    align-items: center;
    margin: 0 10px; 
    font-size: 10px;
    cursor: pointer;
    color: #4756D9; 
    font-weight: normal;
  }
  
  input[type="radio"] {
    accent-color: #4756D9;
    margin-right: 5px;
  }
  
  input[type="radio"]:checked + label {
    color: #4756D9; 
    font-weight: bold;
  }
`;