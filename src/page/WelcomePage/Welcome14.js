import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagesingle';
import ProgressBar from './ProgressBar';

const BackgroundImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #92B3BD;
    background-position: center top;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -2;
`;

function Welcome14() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너랑 잘 맞을 것 같은 학과생이 있어?";
  const typingSpeed = 75;
  const currentStep = 14;
  const totalSteps = 19;
  const navigate = useNavigate();
  const [typingText, setTypingText] = useState('');
  const [displayedText, setDisplayedText] = useState('...'); // 화면에 표시되는 타이핑 텍스트

  const jobs = ['상경대', '문과대', '이과대', '자연대', '법대', '공과대', '교대', '인문대', '의과대', '약학대', '예술대', '체대', '항공대', '경찰대', '사관학교'];
  const [selectedJob, setSelectedJob] = useState('');
  const [showJobOptions, setShowJobOptions] = useState(false);

  useEffect(() => {
    if (message.length < fullMessage1.length) {
      setTimeout(() => {
        setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
      }, typingSpeed);
    }
  }, [message, fullMessage1]);

  useEffect(() => {
    if (selectedJob) {
      // 선택된 학과가 바뀔 때마다 displayedText를 초기화하고 새 메시지를 설정
      setDisplayedText('');
      const newMessage = ` 나는 ${selectedJob} 학생이랑 잘 맞을 것 같아!`;
      setTypingText(newMessage);
    }
  }, [selectedJob]);

  useEffect(() => {
    let i = 0;
    if (typingText) {
      const intervalId = setInterval(() => {
        if (i < typingText.length) {
          setDisplayedText((prev) => prev + typingText.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);

      return () => clearInterval(intervalId);
    }
  }, [typingText]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowJobOptions(false);
  };

 


  const handlePreviousClick = () => navigate(-1);

  const handleNextClick = () => {
    if (selectedJob) {
      // 로컬 스토리지에서 userData 객체를 가져옵니다.
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // 성별에 따라 해당하는 키에 학과 정보를 저장합니다.
      if (userData.ismale === 1) {
        userData.w_major = selectedJob; // 남자일 경우 m_major 키에 저장
      } else if (userData.ismale === 0) {
        userData.m_major = selectedJob; // 여자일 경우 w_major 키에 저장
      }
  
      // 변경된 userData 객체를 로컬 스토리지에 저장합니다.
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // 다음 페이지로 이동합니다.
      navigate('/login/information/Welcome15');
    } else {
      alert("학과를 선택해주세요.");
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
        <div className="message-content">{displayedText}</div>
      </div>
      </div>
    </div> </div>
    
     <div></div>
      

      
      <div className="JobSelectionButton">
      <div className="job-selection" onClick={() => setShowJobOptions(!showJobOptions)}>
        {selectedJob || "학과를 선택해주세요."}
      
      {showJobOptions && (
        <div className="joboptions">
          {jobs.map((job) => (
            <div key={job} onClick={() => handleJobSelect(job)} className="jobselectoptions">
              {job}
            </div>
          ))}
        </div>
      )}
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

export default Welcome14;
