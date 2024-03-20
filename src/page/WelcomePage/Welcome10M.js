import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome10.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagesingle10';
import ProgressBar from './ProgressBar';

const BackgroundImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #83A98B;
    background-position: center top;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -2;
    
`;

const RectangleContainer = styled.div`
height: 90%;
top: 10px;
position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // 버튼들을 가운데 정렬합니다.
  
  gap: 3px; // 버튼들 사이의 간격
  padding: 10px 3px; // 안쪽 여백
  background-color: rgba(217, 217, 217, 0.4); // #D9D9D9의 투명도 50%
  border-radius: 20px; // 모서리를 둥글게
  margin: 5px 24px; // 주변 여백
  z-index: 1;
  
  right: 5px; 
  // 필요하다면 여기에 더 많은 스타일을 추가할 수 있습니다.
`;

const getRandomMargin = () => `${Math.floor(Math.random() * 13) + 5}px`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 10px;
  padding: 1px 15px;
  margin: ${getRandomMargin()}; // 랜덤 마진 적용
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: relative; // Relative to the parent's flow
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 11px; /* 폰트 사이즈를 16픽셀로 설정합니다. */
  font-weight: 500;
  color: black;
  &:hover {
    background-color: #f0f0f0;
  
  }
`;

function Welcome10M() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너에게 맞는 키워드를 모두 골라줘!";
  const typingSpeed = 75;
  const currentStep = 10;
  const totalSteps = 19;
  const navigate = useNavigate();
  
  

  const buttons = ['군필', '미필', '섹시함', '귀여움', '호기심많은', '열정적', '리드하는 편', '따라가는 편', '긍정적', '우울', '진중한', '차분함', '감성적', '이성적'];

  const [buttonMargins] = useState(
    buttons.map(() => ({
      margin: `${getRandomMargin()} ${getRandomMargin()} ${getRandomMargin()} ${getRandomMargin()}`,
    }))
  );

  useEffect(() => {
    if (message.length < fullMessage1.length) {
      setTimeout(() => {
        setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
      }, typingSpeed);
    }
  }, [message, fullMessage1]);

  


  const [selectedButtons, setSelectedButtons] = useState({});

  // Function to handle button click
  const handleButtonClick = (index) => {
    setSelectedButtons(prevSelectedButtons => ({
      ...prevSelectedButtons,
      [index]: !prevSelectedButtons[index]
    }));
  };

  // Buttons data could also come from props or a different state
  

 
 


  const handlePreviousClick = () => navigate(-1);

  const handleNextClick = () => {
    // 로컬 스토리지에서 기존의 userData 객체를 가져옵니다.
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
    // 선택된 버튼의 인덱스를 사용하여 해당 버튼의 텍스트 값을 추출하고 배열로 구성합니다.
    const keywords = Object.keys(selectedButtons).filter(index => selectedButtons[index]).map(index => buttons[index]);

    const army = keywords.includes('군필') ? true : false;
  
    // userData 객체에 keyword 키와 추출한 텍스트 배열을 저장합니다.
    const updatedUserData = {
      ...userData,
      keyword: keywords,
      army: army
    };
  
    // 업데이트된 userData 객체를 로컬 스토리지에 저장합니다.
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
    // 다음 페이지로 이동합니다.
    navigate('/login/information/Welcome11');
  };

  return (
    <div className="home10">
      <BackgroundImage />
      <div className="header">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="header10">
      
      <div className="image-with-typing10">
      <img src={`${process.env.PUBLIC_URL}/image/welcome/backgroundlong.png`} alt = "back"
      />
       <div className='rcontainer10'>
      <SplitMessage message={message} splitIndex={fullMessage1.length} />
    </div>
    
    </div> </div>
    
    <RectangleContainer>
      {buttons.map((text, index) => (
        <StyledButton
          key={index}
          onClick={() => handleButtonClick(index)}
          style={{
            backgroundColor: selectedButtons[index] ? '#D9D9D9' : 'white',
            // 버튼 상태에 저장된 마진 값을 사용합니다.
            margin: buttonMargins[index].margin,
          }}
        >
          {text}
        </StyledButton>
      ))}
    </RectangleContainer>
    
      <div className="buttons-container10">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
      <div></div>
      
      </div>
   
  );
}

export default Welcome10M;
