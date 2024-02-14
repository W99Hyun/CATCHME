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
    background-position: center top; /* 이미지가 수평 및 수직 중앙에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;
` 

  function Welcome11() {
    const currentStep = 10;
  const totalSteps = 14;
    const [message, setMessage] = useState('');
const fullMessage1 = "너는 어떤 얼굴상이야?";
const typingSpeed = 75;

useEffect(() => {
    if (message.length < fullMessage1.length) {
      setTimeout(() => {
        setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
      }, typingSpeed);
    }
  }, [message, fullMessage1]);

  const navigate = useNavigate();

  const [selectedJob, setSelectedJob] = useState(''); // 사용자가 선택한 직업
  const [showOptions, setShowOptions] = useState(false); // 옵션 목록을 표시할지 결정하는 상태
  const [typingText, setTypingText] = useState('...'); // 말풍선에 표시될 타이핑 텍스트
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태

  useEffect(() => {
    if (isTyping) {
      if (typingText !== selectedJob && selectedJob) {
        const nextCharIndex = typingText.length;
        const nextChar = selectedJob[nextCharIndex];

        const timeoutId = setTimeout(() => {
          setTypingText((text) => text + nextChar);
        }, 75); // 한 글자씩 타이핑 속도 조절

        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false); // 타이핑이 완료되면 상태를 업데이트
      }
    }
  }, [typingText, selectedJob, isTyping]);

  const jobs = [
    { label: '강아지상', emoji: '🐶' },
    { label: '고양이상', emoji: '🐱' },
    { label: '토끼상', emoji: '🐰' },
    { label: '여우상', emoji: '🦊' },
    { label: '늑대상', emoji: '🐺' },
    { label: '공룡상', emoji: '🦖' },
    { label: '말상', emoji: '🐴' },
    // ... 나머지 옵션들
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job); // 선택한 직업을 상태에 저장합니다.
    setTypingText(''); // 타이핑 텍스트를 초기화합니다.
    setIsTyping(true); // 타이핑 시작 상태로 변경합니다.
    setShowOptions(false); // 옵션 목록을 숨깁니다.
  };
  

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    // "다음" 버튼 클릭 시에 실행될 로직
    navigate('/login/information/Welcome12'); // '/welcome05' 경로로 이동
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
      <div className="typing-container">
      <div className="typing message">
        {typingText}
      </div>
      </div>
      <div className="JobSelectionButton">
      <div className="job-selection" onClick={() => setShowOptions(!showOptions)}>
        {selectedJob || "얼굴상을 선택해주세요."}
      </div>
      {showOptions && (
  <div className="options">
    {jobs.map((job) => (
      <div key={job.label} onClick={() => handleJobSelect(job.label)} className="option">
        {job.emoji} {job.label} {/* 이모티콘과 라벨을 함께 렌더링합니다 */}
            </div>
          ))}
        </div>
      )}
      </div>
      
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
    </div>
    
  );
}

export default Welcome11 ;