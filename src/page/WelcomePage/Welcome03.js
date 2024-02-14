import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome.css';
import styled from "styled-components"
import SplitMessage from './SplitMessage';
import ProgressBar from './ProgressBar';


const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #B591D1;
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

useEffect(() => {
  if (message.length < fullMessage1.length + fullMessage2.length) {
    setTimeout(() => {
      setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                 fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
    }, typingSpeed);
  }
}, [message, fullMessage1, fullMessage2]);

  const navigate = useNavigate();

      
  const [sliderValue, setSliderValue] = useState(25); // 초기값을 50으로 설정

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  useEffect(() => {
    const percentage = ((sliderValue - 20) / (30 - 20)) * 100; // 슬라이더의 min과 max 값을 고려하여 계산
    document.documentElement.style.setProperty('--slider-percentage', `${percentage}%`);
  }, [sliderValue]);


  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1); // 이전 페이지로 돌아갑니다.
  };

  const handleNextClick = () => {
    // "다음" 버튼 클릭 시에 실행될 로직
    navigate('/login/information/Welcome04'); // '/welcome05' 경로로 이동
  };


  return (
    <div className="home">
      <BackgroundImage />
      <div className="header">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="header1">
      </div>
      <SplitMessage message={message} splitIndex={fullMessage1.length} />
      <div className='value-container'>
      <div className="slider-value">{sliderValue}</div>
      </div>
    <div className="slider-container">
    <input
      type="range"
      min="20" // 슬라이더의 최소값
      max="30" // 슬라이더의 최대값
      value={sliderValue}
      onChange={handleSliderChange}
      className="slider"
    />
      </div>
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
    </div>
    
  );
}

export default Welcome03 ;
