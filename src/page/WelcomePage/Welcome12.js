import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome09.css';
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

  function Welcome12() {
    const [message, setMessage] = useState('');
    const fullMessage1 = "알려줘서 고마워!";
    const fullMessage2 = "이제 너의 이상형을 알려줘!!"
    const typingSpeed = 75;
    const currentStep = 12;
      const totalSteps = 19;

      useEffect(() => {
        if (message.length < fullMessage1.length + fullMessage2.length) {
          setTimeout(() => {
            setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                       fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
          }, typingSpeed);
        }
      }, [message, fullMessage1, fullMessage2]);
      
        const navigate = useNavigate();

      
        const [unlocksliderValue, setunlockSliderValue] = useState(2);
  const [currentText, setCurrentText] = useState('...');
  const typingIntervalRef = useRef(null);

  const typeMessage = (newMessage) => {
    clearInterval(typingIntervalRef.current);
    setCurrentText('');

    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < newMessage.length) {
        setCurrentText((prev) => prev + newMessage.charAt(index));
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
      }
    }, typingSpeed);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setunlockSliderValue(value);
  };

  const handleMouseUp = () => {
    if (unlocksliderValue >= 60) {
      setunlockSliderValue(100);
      typeMessage(" 알겠어!");
    } else {
      setunlockSliderValue(2);
      typeMessage(" ...");
    }
  };

  
  

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1); // 이전 페이지로 돌아갑니다.
  };

  const handleNextClick = () => {
    // 슬라이더 값이 100일 경우에만 다음 페이지로 이동
    if (unlocksliderValue === 100) {
      navigate('/login/information/Welcome13');
    } else {
      // 100이 아니라면 경고 메시지 표시
      alert("이상형 정보 입력에 동의해주세요!");
    }
  };

  return (
    <div className="home3">
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
    <div className="typing-container09">
      <div className="message typing09">
        <span>{currentText}</span>
        </div>
      
      </div>
    </div>
    
    </div>
    
      <div className="unlockslider-container">
      <div className="unlockslider-text">밀어서 동의하기</div>
      <input
  type="range"
  min="0"
  max="100"
  value={unlocksliderValue}
  onChange={handleChange}
  onMouseUp={handleMouseUp}
  onTouchEnd={handleMouseUp}
  className={`unlockslider ${unlocksliderValue >= 100 ? 'active' : ''}`}
/>
<div className={`unlockslider-thumb ${unlocksliderValue >= 60 ? 'active' : ''}`}></div>  
    </div>
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
    </div>
    
  );
}

export default Welcome12 ;