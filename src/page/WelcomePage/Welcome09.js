import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome09.css';
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
const CharacterContainer = styled.div`
  
background-color: rgba(255, 255, 255, 0.8); // 흰색 배경에 투명도 80%를 설정합니다.
  width: 60vw;
  height: 42vw;
  padding: 20px; // 내부 여백을 설정합니다.
  border-radius: 20px; // 모서리를 둥글게 합니다.
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); // 그림자를 추가합니다.
  display: flex;
  justify-content: center;
  align-items: center;
`;



  function Welcome09() {
    const [message, setMessage] = useState('');
const fullMessage1 = "종아! 이제 너가 사용할 캐릭터를 골라봐!";
const fullMessage2 = "너와 닮은 동물이면 더 좋겠지?"
const typingSpeed = 75;
const currentStep = 9;
  const totalSteps = 20;

  const { gender } = useGender();

  const characters = gender === '남자' ? [
    { name: 'Mrabbit', message: ' 토끼 캐릭터로 할래!' },
    { name: 'Mmonkey', message: ' 원숭이 캐릭터로 할래!' },
    { name: 'Mbear', message: ' 곰 캐릭터로 할래!' },
    { name: 'Mcat', message: ' 고양이 캐릭터로 할래!' },
    { name: 'Mdino', message: ' 공룡 캐릭터로 할래!' },
    { name: 'Mdog', message: ' 강아지 캐릭터로 할래!' },
    { name: 'Mduck', message: ' 오리 캐릭터로 할래!' },
    { name: 'Mfox', message: ' 여우 캐릭터로 할래!' },
    { name: 'Mgiraffe', message: ' 기린 캐릭터로 할래!' },
    { name: 'Mmouse', message: ' 쥐 캐릭터로 할래!' },
    { name: 'Motter', message: ' 수달 캐릭터로 할래!' },
    { name: 'Mpanda', message: ' 팬더 캐릭터로 할래!' },
    { name: 'Mquokka', message: ' 쿼카 캐릭터로 할래!' },
    { name: 'Msheep', message: ' 양 캐릭터로 할래!' },
    { name: 'Msnake', message: ' 뱀 캐릭터로 할래!' },
    { name: 'Mtiger', message: ' 호랑이 캐릭터로 할래!' },
    { name: 'Mturtle', message: ' 거북이 캐릭터로 할래!' }
    // 남자 캐릭터 목록...
  ] : [
    { name: 'Wrabbit', message: ' 토끼 캐릭터로 할래!' },
    { name: 'Wmonkey', message: ' 원숭이 캐릭터로 할래!' },
    { name: 'Wbear', message: ' 곰 캐릭터로 할래!' },
    { name: 'Wcat', message: ' 고양이 캐릭터로 할래!' },
    { name: 'Wdino', message: ' 공룡 캐릭터로 할래!' },
    { name: 'Wdog', message: ' 강아지 캐릭터로 할래!' },
    { name: 'Wduck', message: ' 오리 캐릭터로 할래!' },
    { name: 'Wfox', message: ' 여우 캐릭터로 할래!' },
    { name: 'Wgiraffe', message: ' 기린 캐릭터로 할래!' },
    { name: 'Wmouse', message: ' 쥐 캐릭터로 할래!' },
    { name: 'Wotter', message: ' 수달 캐릭터로 할래!' },
    { name: 'Wpanda', message: ' 팬더 캐릭터로 할래!' },
    { name: 'Wquokka', message: ' 쿼카 캐릭터로 할래!' },
    { name: 'Wsheep', message: ' 양 캐릭터로 할래!' },
    { name: 'Wsnake', message: ' 뱀 캐릭터로 할래!' },
    { name: 'Wtiger', message: ' 호랑이 캐릭터로 할래!' },
    { name: 'Wturtle', message: ' 거북이 캐릭터로 할래!' },

    // 여자 캐릭터 목록...
  ];

 
 
  
  
  const [currentText, setCurrentText] = useState('...'); // 현재 화면에 보여지는 텍스트
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  
  const handleArrowClick = (direction) => {
    setHasClicked(true);

    // 이전 타이핑 애니메이션을 중지합니다.
    clearInterval(typingIntervalRef.current);
    setCurrentText(''); // 타이핑 텍스트를 초기화합니다.

    setCurrentIndex((prevIndex) => {
      let newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
      if (newIndex < 0) {
        newIndex = characters.length - 1;
      } else if (newIndex >= characters.length) {
        newIndex = 0;
      }

      // 새 인덱스에 해당하는 캐릭터 메시지로 타이핑 애니메이션을 시작합니다.
      typeMessage(characters[newIndex].message);

      return newIndex;
    });
  };


  const typeMessage = (message) => {
    let index = 0;
    let typedMessage = ''; // 메시지를 누적시킬 변수

    // 이전 타이핑 애니메이션을 중지합니다.
    clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      typedMessage += message.charAt(index); // 현재 문자를 누적시킴
      setCurrentText(typedMessage); // 누적된 메시지로 상태 업데이트
      index++;
      if (index === message.length) {
        clearInterval(typingIntervalRef.current); // 메시지의 끝에 도달하면 인터벌 정지
      }
    }, typingSpeed);
  };

  // useRef를 사용하여 typingInterval의 참조를 저장합니다.
  const typingIntervalRef = useRef(null);

  // 캐릭터 인덱스가 바뀔 때마다 타이핑 애니메이션을 시작
  

  
  useEffect(() => {
    if (hasClicked) { // 사용자가 화살표 버튼을 클릭한 경우에만 타이핑 애니메이션 시작
        let index = 0;
        setCurrentText(''); // 시작 전에 텍스트를 초기화

        const typingInterval = setInterval(() => {
            setCurrentText((prev) => prev + characters[currentIndex].message.charAt(index));
            index++;
            if (index === characters[currentIndex].message.length) {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }
}, [currentIndex, hasClicked]);
  
  

useEffect(() => {
  if (message.length < fullMessage1.length + fullMessage2.length) {
    setTimeout(() => {
      setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                 fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
    }, typingSpeed);
  }
}, [message, fullMessage1, fullMessage2]);

  const navigate = useNavigate();

      
 
  
 
 


  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1); // 이전 페이지로 돌아갑니다.
  };

  const handleNextClick = () => {
    // 로컬 스토리지에서 기존의 userData 객체를 가져옵니다.
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
    // 선택된 캐릭터 이름에서 첫 글자를 제거하여 animal 키에 저장할 값을 설정합니다.
    const animal = characters[currentIndex].name.substring(1);
  
    // userData 객체에 animal 키와 값으로 선택된 캐릭터의 이름을 업데이트합니다.
    const updatedUserData = {
      ...userData,
      animal: animal
    };
  
    // 업데이트된 userData 객체를 로컬 스토리지에 다시 저장합니다.
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
    // 다음 페이지로 이동합니다.
    
      navigate('/login/information/Welcome21');
   
  };
 
 


  return (
    <div className="home2">
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
      
      <div className="character-selector">
       {/* 왼쪽 화살표 버튼 */}<CharacterContainer>
       <button onClick={() => handleArrowClick('left')}>{"<"}</button>
      {/* 현재 캐릭터 이미지 */}
      
      <img key={currentIndex} src={`${process.env.PUBLIC_URL}/image/welcome/${characters[currentIndex].name}.png`} alt={characters[currentIndex].name} />
      {/* 오른쪽 화살표 버튼 */}
     
      <button onClick={() => handleArrowClick('right')}>{">"}</button> </CharacterContainer>
        
      </div>
      
      
      <div className="buttons09-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
    
    </div>
    </div>
    
  );
}

export default Welcome09 ;
