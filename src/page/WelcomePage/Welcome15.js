import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagedouble';
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

  function Welcome15() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "선호하는 이상적인 키가 궁금해!";
  const fullMessage2 = "범위를 알려줘!"
  const typingSpeed = 75;
  const currentStep = 12;
  const totalSteps = 14;

  const [currentText, setCurrentText] = useState('...'); 
  const [typingText, setTypingText] = useState(''); 
  const [typing, setTyping] = useState(false); 
  const typingIntervalRef = useRef(null);
  
  
  const resetTyping = () => {
    clearInterval(typingIntervalRef.current);
    setCurrentText('');
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

      
  const [sliderValueMin, setSliderValueMin] = useState(140); // 최소값 슬라이더의 상태
  const [sliderValueMax, setSliderValueMax] = useState(190); // 최대값 슬라이더의 상태
  const handleSliderChangeMin = (e) => {
    const newMinValue = Math.min(e.target.value, sliderValueMax - 5);
    setSliderValueMin(newMinValue);
  };

  const handleSliderChangeMax = (e) => {
    const newMaxValue = Math.max(e.target.value, sliderValueMin + 5);
    setSliderValueMax(newMaxValue);
  };
  useEffect(() => {
    const percentage = ((sliderValueMax - 140) / (190 - 140)) * 100; 
    document.documentElement.style.setProperty('--slider-percentage', `${percentage}%`);
  }, [sliderValueMax]);


  const handlePreviousClick = () => {
    navigate(-1); 
  };

  const handleNextClick = () => {
    // 로컬 스토리지에서 기존 userData 객체를 가져옵니다.
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
    // 선호하는 나이 범위를 문자열로 결합합니다.
    const ageRange = `${sliderValueMin}-${sliderValueMax}`;
  
    // 성별에 따라 적절한 키를 사용하여 userData 객체를 업데이트합니다.
    if (userData.ismale === 1) {
      userData.w_height = ageRange;  // 남성 사용자의 경우
    } else if (userData.ismale === 0) {
      userData.m_height = ageRange;  // 여성 사용자의 경우
    }
  
    // 변경된 userData 객체를 로컬 스토리지에 저장합니다.
    localStorage.setItem('userData', JSON.stringify(userData));
  
    // 다음 페이지로 이동합니다.
    navigate('/login/information/Welcome17');
  };

 
  const handleSliderStop = () => {
    resetTyping();
      setTypingText(` 나는 ${sliderValueMin}cm부터 ${sliderValueMax}cm가 좋아!`);
      setTyping(true); // 새로운 타이핑 시작
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
          min="140"
          max="190"
          value={sliderValueMin}
          onChange={handleSliderChangeMin}
          onMouseUp={handleSliderStop} // 마우스 버튼을 놓을 때 이벤트
          onTouchEnd={handleSliderStop} // 터치가 끝날 때 이벤트 (모바일 대응)
          className="slider3"
        />
        <input
          type="range"
          min="140"
          max="190"
          value={sliderValueMax}
          onChange={handleSliderChangeMax}
          onMouseUp={handleSliderStop} // 마우스 버튼을 놓을 때 이벤트
          onTouchEnd={handleSliderStop} // 터치가 끝날 때 이벤트 (모바일 대응)
          className="slider3"
        />
      <div className="slider-labels">
      <div className="slider-label-left">140</div>
      <div className="slider-label-right">190</div>
    </div>
    <div className="slider-instruction">스크롤을 좌우로 이동하여 조절하세요</div>
      </div>
      <div className="slider3value-container">
      <div class="value-box">
  {sliderValueMin}
</div>
<span> ~ </span>
<div class="value-box">
  {sliderValueMax}
</div>
      
       
      </div>
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
    
    </div>
    </div>
    
  );
}

export default Welcome15 ;
