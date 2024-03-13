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
    background-color: #83A98B;
    background-position: center top; /* 수평 중앙, 수직 상단에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;

` 

  function Welcome06() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너는 어떤 모습인지 궁금해!";
  const typingSpeed = 75;
  const currentStep = 5;
  const totalSteps = 14;
  

  const [currentText, setCurrentText] = useState('...'); // 현재 화면에 보여지는 텍스트
  const [typingText, setTypingText] = useState(''); // 타이핑될 전체 텍스트
  const [typing, setTyping] = useState(false); // 타이핑 상태
  

  const typingIntervalRef = useRef(null);

  const heightChange = (event) => {
    const newValue = event.target.value;
    if (selectedtype) { // 선택된 체형이 있을 경우에만 타이핑을 시작합니다.
      setValue(newValue); // 슬라이더의 값을 업데이트합니다.
      startTypingMessage(newValue, selectedtype); // 타이핑을 시작합니다.
    }
  };


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
    if (value && selectedtype && eyeType) {
      // 로컬 스토리지에서 기존 userData 객체 불러오기
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // 사용자의 키, 체형, 눈의 타입을 userData 객체에 추가
      const updatedUserData = {
        ...userData,
        height: value,
        body: selectedtype,
        eyes: eyeType
      };
  
      // 업데이트된 userData 객체를 로컬 스토리지에 저장
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      // 다음 페이지로 네비게이션
      navigate('/login/information/Welcome07');
    } else {
      alert('모든 정보를 입력해주세요.');
    }
  };

  
  const marks = [150, 155, 160, 165, 170, 175, 180, 185, 190]; // 슬라이더의 눈금 값
  const [value, setValue] = useState(170); // 슬라이더의 현재 값
  const [selectedtype, setSelectedtype] = useState(''); // 선택된 버튼의 상태
  
  const startTypingMessage = (height, type, eyeType) => {
    if (type && eyeType) {
    resetTyping();
    const newMessage = `나는 ${height}cm고 ${type} 체형을 가지고 있어! 그리고 눈은 ${eyeType}이야!`;
    setTypingText(newMessage);
    setTyping(true);}
  };

  const [eyeType, setEyeType] = useState('');

  const handleButtonClick = (type) => {
    setSelectedtype(type);
    startTypingMessage(value, type, eyeType);
  };

  const handleEyeTypeClick = (eyeType) => {
    setEyeType(eyeType);
    startTypingMessage(value, selectedtype, eyeType);
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
      <div className="heightlocation-container"> 
      <input
          type="range"
          min="150"
          max="190"
          value={value}
          className="heightslider"
          id="myRange"
          onChange={(e) => setValue(e.target.value)} // 슬라이더 값만 업데이트합니다.
          onMouseUp={heightChange} // 마우스 클릭을 놓을 때 이벤트 핸들러
          onTouchEnd={heightChange} // 터치를 놓을 때 이벤트 핸들러
        />
      <div className="marks">
    {marks.map(mark => (
      <div key={mark} className="mark-container" style={{ left: `${(mark - 150) / (190 - 150) * 100}%` }}>
        <div className="mark" />
        <div className="mark-label">{mark}</div>
        </div>
    ))}
  </div>
  <div className="heightslider-instructions">화살표를 좌우로 이동하여 조정하세요</div>
    </div>
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

export default Welcome06 ;