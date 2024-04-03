import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 
import './Welcome.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagedouble';
import ProgressBar from './ProgressBar';

const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #83A98B;;
    background-position: center top; /* 수평 중앙, 수직 상단에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -2;
`

function Welcome08() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "얼굴이 뚜렷한 편이야?";
  const fullMessage2 = "피부톤도 골라줘!"
  const typingSpeed = 75;
  const currentStep = 8;
    const totalSteps = 20;
  
    useEffect(() => {
        if (message.length < fullMessage1.length + fullMessage2.length) {
          setTimeout(() => {
            setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                       fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
          }, typingSpeed);
        }
      }, [message, fullMessage1, fullMessage2]);

  const navigate = useNavigate();

  
  const [currentText, setCurrentText] = useState('...');
  const [typingText, setTypingText] = useState('');
  const [selectedfaceType, setSelectedfaceType] = useState('');
  const [selectedtoneType, setSelectedtoneType] = useState('');
  const typingIntervalRef = useRef(); // 타이핑 인터벌을 위한 ref

  const faceTypes = [
    '뚜렷상', '두부상'
  ];

  const toneTypes = [
    '밝은', '보통', '어두운'
  ];

  const handlefaceTypeButtonClick = (faceType) => {
    setSelectedfaceType(faceType);
    // 피부톤 선택 상태가 이미 있다면 타이핑 텍스트를 업데이트합니다.
    if (selectedtoneType && faceType !== selectedfaceType) {
      setCurrentText('');
      setTypingText(`  나는 ${faceType}이고 ${selectedtoneType} 피부톤이야!`);
    }
  };
  
  const handletoneTypeButtonClick = (toneType) => {
    setSelectedtoneType(toneType);
    // 얼굴상 선택 상태가 이미 있다면 타이핑 텍스트를 업데이트합니다.
    if (selectedfaceType && toneType !== selectedtoneType) {
      setCurrentText('');
      setTypingText(`  나는 ${selectedfaceType}이고 ${toneType} 피부톤이야!`);
    }
  };

  useEffect(() => {
    if (typingText) {
      setCurrentText(''); // 기존 텍스트를 지우고
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
    }
    // 컴포넌트가 언마운트되거나 typingText가 변경될 때 타이머를 정리합니다.
    return () => clearInterval(typingIntervalRef.current);
  }, [typingText, typingSpeed]);
  
  

  


  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    if (selectedfaceType && selectedtoneType) {
      // 기존의 userData 객체를 로컬 스토리지에서 불러옵니다.
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // 새로운 얼굴상과 피부톤 정보를 userData 객체에 추가합니다.
      const updatedUserData = {
        ...userData,
        face: {
          type: selectedfaceType,
          tone: selectedtoneType
        }
      };
  
      // 업데이트된 userData 객체를 로컬 스토리지에 저장합니다.
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      // 다음 페이지로 이동합니다.
      navigate('/login/information/Welcome09');
    } else {
      alert('얼굴상과 피부톤을 선택해주세요!');
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
    
      

      <div className="faceSelectionButton">
     
      <div className="faceTypecontainer">
        {faceTypes.map(faceType => ( // 첫 8개의 MBTI 유형
          <button
            key={faceType}
            className={`face-button ${selectedfaceType === faceType ? 'selected' : ''}`}
            onClick={() => handlefaceTypeButtonClick(faceType)}
          >
            {faceType}
          </button>
        ))}
      </div>
      <div style={{
    height: '1.5px', // 막대의 높이
    backgroundColor: 'white', // 막대의 색상
    width: '60%', // 막대의 너비
    margin: '8px auto', // 막대의 상하 마진 (자동으로 좌우 중앙 정렬)
  }} />
      
    </div>
    <div className="toneSelectionButton">
    <div className="toneTypecontainer">
    {toneTypes.map(toneType => (
      <button
        key={toneType}
        className={`face-button ${selectedtoneType === toneType ? 'selected' : ''}`}
        onClick={() => handletoneTypeButtonClick(toneType)}
      >
        {toneType}
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

export default Welcome08;