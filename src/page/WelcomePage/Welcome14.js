import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 
import './Welcome.css';
import './Welcome02.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagesingle';
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

function Welcome04() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "너는 어디에 살아?";
  
  const typingSpeed = 75;
  const currentStep = 3;
    const totalSteps = 14;
  
  
    useEffect(() => {
      if (message.length < fullMessage1.length) {
        setTimeout(() => {
          setMessage (fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)))
        }, typingSpeed);
      }
    }, [message, fullMessage1]);
  

  const navigate = useNavigate();

  const [typingText, setTypingText] = useState('...'); // 타이핑 텍스트
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
 
  const [typingMessage, setTypingMessage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubArea, setSelectedSubArea] = useState('');
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedSubArea('');
    setTypingMessage(''); // 상위 지역 변경 시 메시지 초기화
  };

  const handleSubAreaChange = (subArea) => {
    setSelectedSubArea(subArea);
    setTypingText('');
    setTypingMessage(`나는 ${selectedRegion} ${subArea}에 살고 있어!`);
    setIsTyping(true);
  };
  const [showRegionDropdown, setShowRegionDropdown] = useState(false); // 지역 드롭다운 상태
  const [showSubAreaDropdown, setShowSubAreaDropdown] = useState(false); // 하위 지역 드롭다운 상태

  const regionsData = [
    {name: "서울특별시",
  subArea: [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
},
{
  name: "경기도",
  subArea: [
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
    "가평군",
    "양평군",
    "여주군",
    "연천군",
  ],
},
{
  name: "인천광역시",
  subArea: [
    "계양구",
    "미추홀구",
    "남동구",
    "동구",
    "부평구",
    "서구",
    "연수구",
    "중구",
    "강화군",
    "옹진군",
  ],
},
{
  name: "대전광역시",
  subArea: ["대덕구", "동구", "서구", "유성구", "중구"],
},
{
  name: "대구광역시",
  subArea: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
},
{
  name: "부산광역시",
  subArea: [
    "강서구",
    "금정구",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
    "기장군",
  ],
},
{
  name: "울산광역시",
  subArea: ["남구", "동구", "북구", "중구", "울주군"],
},
{
  name: "광주광역시",
  subArea: ["광산구", "남구", "동구", "북구", "서구"],
},
{
  name: "강원도",
  subArea: [
    "강릉시",
    "동해시",
    "삼척시",
    "속초시",
    "원주시",
    "춘천시",
    "태백시",
    "고성군",
    "양구군",
    "양양군",
    "영월군",
    "인제군",
    "정선군",
    "철원군",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ],
},
{
  name: "충청북도",
  subArea: [
    "제천시",
    "청주시",
    "충주시",
    "괴산군",
    "단양군",
    "보은군",
    "영동군",
    "옥천군",
    "음성군",
    "증평군",
    "진천군",
    "청원군",
  ],
},

{
  name: "충청남도",
  subArea: [
    "계룡시",
    "공주시",
    "논산시",
    "보령시",
    "서산시",
    "아산시",
    "천안시",
    "금산군",
    "당진군",
    "부여군",
    "서천군",
    "연기군",
    "예산군",
    "청양군",
    "태안군",
    "홍성군",
  ],
},

{
  name: "경상북도",
  subArea: [
    "경산시",
    "경주시",
    "구미시",
    "김천시",
    "문경시",
    "상주시",
    "안동시",
    "영주시",
    "영천시",
    "포항시",
    "고령군",
    "군위군",
    "봉화군",
    "성주군",
    "영덕군",
    "영양군",
    "예천군",
    "울릉군",
    "울진군",
    "의성군",
    "청도군",
    "청송군",
    "칠곡군",
  ],
},
{
  name: "경상남도",
  subArea: [
    "거제시",
    "김해시",
    "마산시",
    "밀양시",
    "사천시",
    "양산시",
    "진주시",
    "진해시",
    "창원시",
    "통영시",
    "거창군",
    "고성군",
    "남해군",
    "산청군",
    "의령군",
    "창녕군",
    "하동군",
    "함안군",
    "함양군",
    "합천군",
  ],
},
{
  name: "전라북도",
  subArea: [
    "군산시",
    "김제시",
    "남원시",
    "익산시",
    "전주시",
    "정읍시",
    "고창군",
    "무주군",
    "부안군",
    "순창군",
    "완주군",
    "임실군",
    "장수군",
    "진안군",
  ],
},
{
  name: "전라남도",
  subArea: [
    "광양시",
    "나주시",
    "목포시",
    "순천시",
    "여수시",
    "강진군",
    "고흥군",
    "곡성군",
    "구례군",
    "담양군",
    "무안군",
    "보성군",
    "신안군",
    "영광군",
    "영암군",
    "완도군",
    "장성군",
    "장흥군",
    "진도군",
    "함평군",
    "해남군",
    "화순군",
  ],
},
{
  name: "제주도",
  subArea: ["서귀포시", "제주시"],
},
];
    

  

  // 예시 학교 목록

 

  useEffect(() => {
    if (isTyping) {
      if (typingText.length < typingMessage.length) {
        const nextChar = typingMessage[typingText.length];
        const timeoutId = setTimeout(() => {
          setTypingText((text) => text + nextChar);
        }, typingSpeed);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
      }
    }
  }, [typingText, typingMessage, isTyping]);
  

  
  

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    
      navigate('/login/information/Welcome13'); // '/welcome05' 경로로 이동

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
    <div className= 'region-selection' onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
      {selectedRegion || "지역을 선택해주세요."}
   
    {showRegionDropdown && (
      <div className="schooloptions">
        {regionsData.map((region) => (
          <div 
            key={region.name} 
            className="schoolselectoptions" 
            onClick={() => handleRegionChange(region.name)}
          >
            {region.name}
          </div>
        ))}
      </div>
    )}
     </div>
  </div>

<div className="JobSelectionButton">
  
    <div className= 'job-selection' onClick={() => setShowSubAreaDropdown(!showSubAreaDropdown)} disabled={!selectedRegion}>
      {selectedSubArea || "시, 군, 구를 선택해주세요"}
    
    {showSubAreaDropdown && selectedRegion && (
      <div className="joboptions">
        {regionsData.find(region => region.name === selectedRegion)?.subArea.map(subArea => (
          <div 
            key={subArea} 
            className="jobselectoptions" 
            onClick={() => handleSubAreaChange(subArea)}
          >
            {subArea}
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

export default Welcome04;