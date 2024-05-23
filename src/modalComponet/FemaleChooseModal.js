import React, { useState, useEffect  } from "react";
import Modal from "react-modal";
import styled, { css, keyframes } from "styled-components";

const customStyles = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%", 
      height: "80%", 
      display: "grid",
      gridTemplateRows: "1fr 1fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 0.5fr", 
    },
  };

  const blinkAnimation = keyframes`
  0% {
    border-color: #000;
  }
  50% {
    border-color: #E296B6;
  }
  100% {
    border-color: #000;
  }
`;

  const TimeText = styled.div`
    color: #FFF;
    font-size: 21px;
    font-weight: 600;
    background: #515151;
    border: 2px solid #515151;
    border-radius: 30px;
    width: 30%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto 30px;
`;

const Text = styled.div`
    text-align: center;
    width: 90%;
    height: 80%;
    margin: 10px auto 30px;
    color: #CE6591;
    font-size: 23px;
    font-weight: 600;
`;

  const GridItem = styled.div`
    display: grid;
    margin: auto;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
    "subgrid1 subgrid2 subgrid3 subgrid3"
    "subgrid4 subgrid4 subgrid4 subgrid5";
    width: 95%;
    height: 90%;
    background: #FFF;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    border: 2px solid transparent;
    ${(props) =>
      props.selected &&
      css`
        animation: ${blinkAnimation} 1s infinite;
      `}    `;

const SubGridItem1 = styled.div`
    grid-area: subgrid1;
    margin: 10px;
 `;

const SubGridItem2 = styled.div`
    grid-area: subgrid2;
    color: #515151;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    margin: auto;
`;

const SubGridItem3 = styled.div`
    grid-area: subgrid3;
    margin: auto;
`;

const SubGridItem4 = styled.div`
    grid-area: subgrid4;
    span {
        color: #CE6591;
        font-size: 19px;
        font-weight: bold;
    }
    margin: auto;
    font-size: 13px;
    font-weight: bold;
`;

const SubGridItem5 = styled.div`
    grid-area: subgrid5;
    margin: auto;
    margin-left: 5px;
`;

const StyledButton = styled.button`
font-family: 'Noto Sans KR', sans-serif;
  width: 140%;
  height: 100%;
  padding: 5px 0;
  font-size: 11px;
  border-radius: 20px;
  background: ${(props) => (props.selected ? "#E296B6" : "#515151")};  
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 5px; /* 여백 조절 */

`;

const StyledButton2 = styled.button`
font-family: 'Noto Sans KR', sans-serif;
  width: 20%;
  height: 31px;
  padding: 5px 0;
  margin: auto;
  font-size: 12px;
  border-radius: 20px; 
  background: ${(props) => (props.selected ? "#E296B6" : "#515151")};
  color: white;
  border: none;
  cursor: pointer;
`;

const FemaleChooseModal = ({ isOpen, onClose, femaleusers }) => {

  const [selectedUser, setSelectedUser] = useState(null);

  const getImagePath = (user) => {
    return `/image/profile/${user.animal.toLowerCase()}Female.png`;
  };

  const [timer, setTimer] = useState(1800);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      onClose();
    }
  }, [timer]);

  const handleButtonClick = async (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleChooseClick = async () => {
    if (selectedUser) {
      await sendSelectedUserToServer(selectedUser);
      console.log(selectedUser)
    }
    onClose();
  };

  const sendSelectedUserToServer = async (selectedUser) => {
    try {
      const response = 
      await fetch(`https://api.catchmenow.co.kr/main/api/user_info/${1001}/update_w_crush/`, {
        method: "PUT",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          w_crush_kid: selectedUser.user
        }),
      });

      if (response.ok) {
        console.log("선택한 사용자 정보 전송 성공");
      } else {
        console.error("선택한 사용자 정보 전송 실패");
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <TimeText>{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</TimeText>
        <Text>
            <span> 마음에 드는 상대를 선택하세요 ! </span>
        </Text>
      {femaleusers.map((user, index) => (
        <GridItem key={index} selected={selectedUser === user}>
          <SubGridItem1>
          <img 
            src={getImagePath(user)} 
            alt={`${user.animal} 이미지`}
            style={{ width: "50px", height: "50px" }}
            />
          </SubGridItem1>
          <SubGridItem2>
            {user.school} {user.major} {user.age}
          </SubGridItem2>
          <SubGridItem3>
            {user.height} {user.body} {user.mbti}
          </SubGridItem3>
          <SubGridItem4>
            회원님의 <span>이상형</span>과 <span>{user.total_conditions}%</span> 부합해요!
          </SubGridItem4>
          <SubGridItem5>
            <StyledButton
                selected={selectedUser === user}
                onClick={() => handleButtonClick(user)}
                >
                {selectedUser === user ? "취소하기 ↗" : "선택하기 ↗"}
            </StyledButton>
          </SubGridItem5>
        </GridItem>
      ))}
        <StyledButton2 selected={selectedUser !== null} onClick={handleChooseClick}>
          선택 완료
        </StyledButton2>
    </Modal>
  );
};

export default FemaleChooseModal;
