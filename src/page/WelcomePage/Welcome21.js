import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 
import './Welcome.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagedouble';
import ProgressBar from './ProgressBar';
import { useGender } from './GenderContext';

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

function Welcome21() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "좋아! 이제 사용할 닉네임을 알려줘!";
  const fullMessage2 = "12자 이내로 정해봐!"
  const typingSpeed = 75;
  const currentStep = 10;
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

  
  const [nickname, setNickname] = useState('');
  const [typingText, setTypingText] = useState('...'); // 타이핑 텍스트
  const { gender } = useGender();

  
    
  

  
 

 

  const handleNicknameChange = (event) => {
    const { value } = event.target;
    // 한글, 영어, 숫자, 띄어쓰기만 허용하는 정규식
    const regex = /^[가-힣a-zA-Z0-9\s]*$/;

    if (regex.test(value) && value.length <= 12) {
        setNickname(value); // 조건을 만족하는 입력만 상태에 설정
    }
};

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    if (nickname) {
      // 로컬 스토리지에서 현재 저장된 userData 불러오기
      const existingUserData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // 사용자가 선택한 학교와 전공 정보를 기존 userData 객체에 추가
      const updatedUserData = {
        ...existingUserData,
        nickname: nickname
      };
  
      // 업데이트된 userData 객체를 로컬 스토리지에 다시 저장
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      // 다음 페이지로 네비게이션
      if (gender === '남자') {
        navigate('/login/information/Welcome10M');
      } else if (gender === '여자') {
        navigate('/login/information/Welcome10W');
      }
    } else {
      // 학교나 전공이 선택되지 않았다면 경고 메시지를 표시
      alert("학교와 전공을 모두 선택해주세요.");
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
        <div className="message-content">{typingText}</div>
      </div>
      </div>
    </div>
    
     </div>
   
     
      

      <div className="SchoolSelectionButton">
      <div className="input-wrapper"> {/* 새로 추가된 div */}
      <input className="school-selection"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          
          placeholder="닉네임을 입력하세요 (최대 12자)"
        />
  </div>
      </div>
      <div className="JobSelectionButton">
      
      </div>
      
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
      <div></div>
      
      </div>
   
  );
}

export default Welcome21;