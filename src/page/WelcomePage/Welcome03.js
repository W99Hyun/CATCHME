import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagedouble';
import ProgressBar from './ProgressBar';
import { useGender } from './GenderContext';


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

  function Welcome03() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너는 몇살이야?";
  const fullMessage2 = "성별도 알려줘!"
  const typingSpeed = 75;
  const currentStep = 2;
  const totalSteps = 14;

  const [currentText, setCurrentText] = useState('...'); 
  const [typingText, setTypingText] = useState(''); 
  const [typing, setTyping] = useState(false); 
  const typingIntervalRef = useRef(null);
  
  
  const resetTyping = () => {
    clearInterval(typingIntervalRef.current);
    setCurrentText('');
  };

  const { gender, setGender: setSelectedGender } = useGender();
  const handleGenderSelect = (selectedGender) => {
    setSelectedGender(selectedGender);
    resetTyping();
    setTypingText(` 나는 ${sliderValue}살이고 ${selectedGender}야!`);
    setTyping(true);
  };

  useEffect(() => {
  if (message.length < fullMessage1.length + fullMessage2.length) {
    setTimeout(() => {
      setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                 fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
    }, typingSpeed);
  }
}, [message, fullMessage1, fullMessage2]);

  const navigate = useNavigate();

      
  const [sliderValue, setSliderValue] = useState(25); 
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  useEffect(() => {
    const percentage = ((sliderValue - 20) / (30 - 20)) * 100; 
    document.documentElement.style.setProperty('--slider-percentage', `${percentage}%`);
  }, [sliderValue]);


  const handlePreviousClick = () => {
    navigate(-1); 
  };

  const handleNextClick = () => {
    if (gender) {
      navigate('/login/information/Welcome04'); 
    } else {
      alert("성별을 선택해주세요."); 
    }
  };

 
  const handleSliderStop = () => {
    resetTyping();
  
    if (gender) {
      
      setTypingText(` 나는 ${sliderValue}살이고 ${gender}야!`);
      setTyping(true); // 새로운 타이핑 시작
    } else {
      
    }
  };

  useEffect(() => {
    if (typing && typingText) {
      let index = 0;
      // 이전 인터벌을 취소합니다.
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = setInterval(() => {
        if (index < typingText.length) {
          setCurrentText((prev) => prev + typingText.charAt(index));
          index++;
        } else {
          clearInterval(typingIntervalRef.current);
          setTyping(false);
        }
      }, typingSpeed);
    }
    // useEffect 정리 함수에서 인터벌을 정리합니다.
    return () => clearInterval(typingIntervalRef.current);
  }, [typing, typingText, typingSpeed]);



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
      
    <div className="slider-container">
    <input
          type="range"
          min="20"
          max="30"
          value={sliderValue}
          onChange={handleSliderChange}
          onMouseUp={handleSliderStop} // 마우스 버튼을 놓을 때 이벤트
          onTouchEnd={handleSliderStop} // 터치가 끝날 때 이벤트 (모바일 대응)
          className="slider"
        />
      <div className="slider-labels">
      <div className="slider-label-left">20</div>
      <div className="slider-label-right">30</div>
    </div>
    <div className="slider-instruction">스크롤을 좌우로 이동하여 조절하세요</div>
      </div>
      <div className="gender-container">
        {/* 성별 선택 버튼 */}
        <button onClick={() => handleGenderSelect('남자')} className="gender-buttons">남자!</button>
        <button onClick={() => handleGenderSelect('여자')} className="gender-buttons">여자!</button>
      </div>
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
    
    </div>
    </div>
    
  );
}

export default Welcome03 ;
