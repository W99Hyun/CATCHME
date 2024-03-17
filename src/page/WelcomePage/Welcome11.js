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
 top:10px;
position: relative;
  display: flex;
  top:10px;
  gap: 3px; // 버튼들 사이의 간격
  padding: 10px 3px; // 안쪽 여백
  background-color: rgba(217, 217, 217, 0.4); // #D9D9D9의 투명도 50%
  border-radius: 20px; // 모서리를 둥글게
  margin: 5px 24px; // 주변 여백
  z-index: 1;
  
  right: 5px; 
  // 필요하다면 여기에 더 많은 스타일을 추가할 수 있습니다.
`;


const StyledTextArea = styled.textarea`
  width: 100%;
  
  padding: 10px 3px;
  border-radius: 20px;
  font-weight: 500;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: black;
  text-align: start;
  resize: none; // 사용자가 크기를 조절하는 것을 방지합니다.
  
  &:focus {
    outline: none;
  }
  &::placeholder {
    line-height: 2; // 줄 간의 간격을 설정합니다.
    color: rgba(0, 0, 0, 0.5);
    font-style: 'Noto Sans KR', sans-serif;
  }
`;

function Welcome11() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "이제 너에 대하여 자유롭게 소개해줘!";
  const typingSpeed = 75;
  const currentStep = 11;
  const totalSteps = 14;
  const navigate = useNavigate();
  
  


  const [inputValue, setInputValue] = useState(''); // 입력값을 관리할 상태를 추가합니다.

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (message.length < fullMessage1.length) {
      setTimeout(() => {
        setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
      }, typingSpeed);
    }
  }, [message, fullMessage1]);

  



  // Function to handle button click
  

  // Buttons data could also come from props or a different state
  

 
 


  const handlePreviousClick = () => navigate(-1);

  const handleNextClick = () => {
    // 로컬 스토리지에서 기존의 userData 객체를 가져옵니다.
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
    // 입력된 텍스트를 userData 객체에 추가합니다.
    const updatedUserData = {
      ...userData,
      free: inputValue.trim() // 앞뒤 공백을 제거합니다.
    };
  
    // 변경된 userData 객체를 로컬 스토리지에 저장합니다.
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
    // 다음 페이지로 이동합니다.
    navigate('/login/information/Welcome12');
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
      <StyledTextArea
        placeholder="EX) 안녕하세요! 
        저는 “루아”예요. 21살이고, 마포구에 살고 있어요. 
        저는 현대미술을 전공하고 있고, 
        패션에 관심이 많아요. 
        영화보는걸 좋아하고, 
        주변 사람들과 어울리는 걸 좋아해요. 
        솔직하고 긍정적인 성격을 가진 분이 이상형이에요. 
        함께 좋은 시간 보내면 좋겠어요!"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = "EX) 안녕하세요! 저는 “루아”예요. 21살이고, 마포구에 살고 있어요. 저는 현대미술을 전공하고 있고, 패션에 관심이 많아요. 영화보는걸 좋아하고, 주변 사람들과 어울리는 걸 좋아해요. 솔직하고 긍정적인 성격을 가진 분이 이상형이에요. 함께 좋은 시간 보내면 좋겠어요!"}
      />
    </RectangleContainer>
    
      <div className="buttons-container10">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
      <div></div>
      
      </div>
   
  );
}

export default Welcome11;
