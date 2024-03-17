import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 
import './Welcome.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagesingle';
import ProgressBar from './ProgressBar';

const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color:  #92B3BD;
    background-position: center top; /* 수평 중앙, 수직 상단에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -2;
`

function Welcome20() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너는 어떤 MBTI가 잘맞아?";
  const typingSpeed = 75;
  const currentStep = 18;
    const totalSteps = 19;
  
  useEffect(() => {
      if (message.length < fullMessage1.length) {
        setTimeout(() => {
          setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
        }, typingSpeed);
      }
    }, [message, fullMessage1]);

  const navigate = useNavigate();

  
  const [currentText, setCurrentText] = useState('...');
  const [typingText, setTypingText] = useState('');
  const [selectedMBTI, setSelectedMBTI] = useState('');
  const typingIntervalRef = useRef(); // 타이핑 인터벌을 위한 ref

  const mbtiTypes = [
    'ENFP', 'ESFP', 'ENTP', 'ESTP',
    'ENFJ', 'ESFJ', 'ENTJ', 'ESTJ',
    'INFP', 'ISFP', 'INTP', 'ISTP',
    'INFJ', 'ISFJ', 'INTJ', 'ISTJ',
  ];

  const handleMbtiButtonClick = (type) => {
    if (selectedMBTI !== type) { // 선택된 MBTI가 변경되었을 때만 타이핑을 재시작합니다.
      setSelectedMBTI(type);
      setCurrentText(''); // 이전 타이핑된 텍스트를 지웁니다.
      clearInterval(typingIntervalRef.current); // 이전 타이핑 인터벌을 클리어합니다.
      setTypingText(` 나는 ${type}랑 잘 맞는 것 같아!`); // 새로운 타이핑 텍스트를 설정합니다.
    }
  };

  useEffect(() => {
    clearInterval(typingIntervalRef.current); // 이전 인터벌을 클리어합니다.
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < typingText.length) {
        setCurrentText((prev) => prev + typingText.charAt(index));
        index++;
      } else {
        clearInterval(typingIntervalRef.current); // 타이핑이 끝나면 인터벌을 클리어합니다.
      }
    }, typingSpeed);
  
    // 컴포넌트가 언마운트되거나 typingText가 변경될 때 타이머를 정리합니다.
    return () => clearInterval(typingIntervalRef.current);
  }, [typingText, typingSpeed]);

  
  

  


  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    if (selectedMBTI) {
      // 로컬 스토리지에서 userData 객체를 가져옵니다.
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // 사용자의 성별에 따라 MBTI 값을 저장합니다.
      if (userData.ismale === 1) {
        userData.w_mbti = selectedMBTI;  // 남성일 경우
      } else {
        userData.m_mbti = selectedMBTI;  // 여성일 경우
      }
  
      // 변경된 userData 객체를 로컬 스토리지에 다시 저장합니다.
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // 다음 페이지로 이동
      navigate('/login/information/Welcome19');
    } else {
      alert('잘 맞는 MBTI 유형을 선택해주세요.');
    }
  };
 

  return (
    <div className="home">
      <BackgroundImage />
      <div className="header">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="header1">
      <div className="image-with-typing">
      <img src={`${process.env.PUBLIC_URL}/image/welcome/background3.png`} alt = "back"
      />
       <div className='rcontainer'>
      <SplitMessage message={message} splitIndex={fullMessage1.length} />
    </div>
    <div className="typing-container">
      <div className="message typing">
        <div className="message-content">{currentText}</div>
      </div>
      </div>
    </div>
    
    </div>
    
      

      <div className="JobSelectionButton">
      {/* 첫 번째 행: E N F P */}
      <div className="mbti-selection-container1">
        {mbtiTypes.slice(0, 4).map(type => ( // 첫 8개의 MBTI 유형
          <button
            key={type}
            className={`mbti-button ${selectedMBTI === type ? 'selected' : ''}`}
            onClick={() => handleMbtiButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mbti-selection-container2">
        {mbtiTypes.slice(4, 8).map(type => ( // 첫 8개의 MBTI 유형
          <button
            key={type}
            className={`mbti-button ${selectedMBTI === type ? 'selected' : ''}`}
            onClick={() => handleMbtiButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
    <div className="JobSelectionButton">
    <div className="mbti-selection-container3">
        {mbtiTypes.slice(8, 12).map(type => ( // 나머지 8개의 MBTI 유형
          <button
            key={type}
            className={`mbti-button ${selectedMBTI === type ? 'selected' : ''}`}
            onClick={() => handleMbtiButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mbti-selection-container4">
        {mbtiTypes.slice(12, 16).map(type => ( // 나머지 8개의 MBTI 유형
          <button
            key={type}
            className={`mbti-button ${selectedMBTI === type ? 'selected' : ''}`}
            onClick={() => handleMbtiButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      
    </div>
      
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
      <div></div>
      
      </div>
   
  );
}

export default Welcome20;