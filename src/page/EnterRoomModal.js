import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const CloudModalContainer = styled.div`
  position: fixed;
  width: 70%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border-radius: 20px;
  padding: 20px;
  z-index: 2;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  border: 45px solid transparent;
  border-image: url('/image/enterBackground.png') 35 fill;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #F1F1F1;
  opacity: 70%;
  z-index: 1;
`;

const Text1 = styled.div`
  color: #E296B6;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  width: 100%;
  height: 40%;
  margin: auto;
`

const Text2 = styled.div`
  color: #E296B6;
  text-align: center;
  font-size: 12px;
  font-weight: 900;
  width: 100%;
  height: 40%;
  margin: auto;
`

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${(props) => props.backgroundColor || "#E296B6"}; 
  color: #ffffff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 80%;
  height: 80%;
  margin: 0 auto;
  font-size: 34px;
  font-weight: 800;
`;

const EnterRoomModal = ({ isOpen, onClose }) => {

  const [selectedPeople, setSelectedPeople] = useState(null);
  const [roomCount, setRoomCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPeople !== null) {
      const fetchData = async () => {
        try {
          const roomResponse = 
          await fetch('https://api.catchmenow.co.kr/room/api/room_info/', { //뒤에 ${selectedPeople} 붙이기 
            method: "GET",
            mode: 'cors'
          })

          const roomNumberdata = await roomResponse.json();
          
          setRoomCount(roomNumberdata);
        } catch (error) {
          console.error('Error fetching room info:', error);
        }
      };
  
      fetchData();
    }
  }, [selectedPeople]);

  const handleButtonClick = (people) => {
    setSelectedPeople(people);
    onClose();

    navigate(`/MeetingRoomMain`, { state: { selectedPeople: people } }); // 이건 임시
  };

  useEffect(() => {
    if (roomCount.count) {
      navigate(`/MeetingRoomMain/${roomCount.count}`);
    }
  }, [roomCount, navigate]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <Backdrop onClick={handleBackdropClick} />
          <CloudModalContainer>
            <Text1> 
              몇 명이서 참여하시나요?
            </Text1>
            <Button backgroundColor="#E296B6" onClick={() => handleButtonClick(1)}>1 : 1</Button>
            <Button backgroundColor="#4AC4AD" onClick={() => handleButtonClick(2)}>2 : 2</Button>
            <Button backgroundColor="#EFC53B" onClick={() => handleButtonClick(3)}>3 : 3</Button>
            <Button backgroundColor="#476EBB" onClick={() => handleButtonClick(4)}>4 : 4</Button>
            <Text2> 
              Tip. 매칭이 되면 미팅의 대표자로서의 
              <br />
              역할을 하게 됩니다.
              <br />
              몇 명의 친구와 미팅을 나갈지 선택하세요 !
            </Text2>
          </CloudModalContainer>
        </>
      )}
    </>
  );
};

export default EnterRoomModal;