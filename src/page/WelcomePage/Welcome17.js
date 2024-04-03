import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagesingle';
import ProgressBar from './ProgressBar';


const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #92B3BD;
    background-position: center top; /* 수평 중앙, 수직 상단에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;

` 

  function Welcome17() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "선호하는 이상적인 체형을 골라봐!";
  const typingSpeed = 75;
  const currentStep = 17;
  const totalSteps = 20;
  

  const [currentText, setCurrentText] = useState('...'); // 현재 화면에 보여지는 텍스트
  const [typingText, setTypingText] = useState(''); // 타이핑될 전체 텍스트
  const [typing, setTyping] = useState(false); // 타이핑 상태
  

  const typingIntervalRef = useRef(null);
  const [eyeType, setEyeType] = useState('');


  useEffect(() => {
    if (typing) {
      if (typingText.length > 0) {
        typingIntervalRef.current = setInterval(() => {
          setCurrentText((prev) => prev + typingText.charAt(0));
          setTypingText((prev) => prev.slice(1));
          if (typingText.length === 1) {
            setTyping(false);
          }
        }, typingSpeed);
      }
      return () => clearInterval(typingIntervalRef.current);
    }
  }, [typing, typingText]);

  // 타이핑 리셋 함수
  const resetTyping = () => {
    clearInterval(typingIntervalRef.current);
    setCurrentText('');
    setTypingText('');
    setTyping(false);
  };


  useEffect(() => {
    if (message.length < fullMessage1.length) {
      setTimeout(() => {
        setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
      }, typingSpeed);
    }
  }, [message, fullMessage1]);

const navigate = useNavigate();

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1); // 이전 페이지로 돌아갑니다.
  };

  const handleNextClick = () => {
    if (selectedtype && eyeType) {
      // userData 객체에 현재 사용자 데이터가 저장되어 있다고 가정
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // userData.ismale 값을 바로 사용하여 조건부 로직 실행
      if (userData.ismale === true) {
        userData.w_body = selectedtype;
        userData.w_eyes = eyeType;
      } else {
        userData.m_body = selectedtype;
        userData.m_eyes = eyeType;
      }
  
      // 변경된 userData 객체를 로컬 스토리지에 저장
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // 다음 페이지로 이동
      navigate('/login/information/Welcome18');
    } else {
      alert('체형과 눈 모양을 모두 선택해주세요.');
    }
  };
  
 
  const [selectedtype, setSelectedtype] = useState(''); // 선택된 버튼의 상태
  const handleButtonClick = (type) => {
    setSelectedtype(type); // 선택된 체형의 상태를 업데이트합니다.
    
      startTypingMessage(type); // 타이핑을 시작합니다.
    
  };

  const handleEyeTypeClick = (eyeType) => {
    setEyeType(eyeType);
    startTypingMessage(selectedtype, eyeType);
  };

  const startTypingMessage = (type, eyeType) => {
    if (type && eyeType) {
    resetTyping();
    const newMessage = `나는 ${type} 체형에 ${eyeType} 눈이 좋아!`;
    setTypingText(newMessage);
    setTyping(true);}
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
        <span>{currentText}</span>
        </div>
      </div>
      </div>
      
      </div>
      
      
      <div className="heightslider-container">
      
    </div>
    <div className="physicalbutton-container">
    <div className="physicalbutton">
    <button
      onClick={() => handleButtonClick('슬림')}
      className={selectedtype === '슬림' ? 'selected' : ''}
    >슬림</button>
    <button
      onClick={() => handleButtonClick('통통')}
      className={selectedtype === '통통' ? 'selected' : ''}
    >통통</button>
 
 
    <button
      onClick={() => handleButtonClick('슬림탄탄')}
      className={selectedtype === '슬림탄탄' ? 'selected' : ''}
    >슬림탄탄</button>
    <button
      onClick={() => handleButtonClick('근육통통')}
      className={selectedtype === '근육통통' ? 'selected' : ''}
    >근육통통</button>
     </div>
  <div className="eyeType-container">
        <button
          onClick={() => handleEyeTypeClick('유쌍')}
          className={eyeType === '유쌍' ? 'selected' : ''}
        >
          유쌍
        </button>
        <button
          onClick={() => handleEyeTypeClick('속쌍')}
          className={eyeType === '속쌍' ? 'selected' : ''}
        >
          속쌍
        </button>
        <button
          onClick={() => handleEyeTypeClick('무쌍')}
          className={eyeType === '무쌍' ? 'selected' : ''}
        >
          무쌍
        </button>
      </div>
      </div>
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
    
    </div>
    </div>
    
  );
}

export default Welcome17 ;