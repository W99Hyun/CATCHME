import React, { useState, useEffect } from 'react';
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

function Welcome04() {
  const [message, setMessage] = useState('');
  const fullMessage1 = "어느 대학교에 다니고 있어?";
  const fullMessage2 = "간단한 전공도 알려줘!"
  const typingSpeed = 75;
  const currentStep = 3;
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

  const [schoolInput, setSchoolInput] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(''); // 선택된 학교
  const [typingText, setTypingText] = useState('...'); // 타이핑 텍스트
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
  const [showSchoolOptions, setShowSchoolOptions] = useState(false); // 학교 선택 드롭다운 표시 여부
  const [showJobOptions, setShowJobOptions] = useState(false); // 직업 선택 드롭다운 표시 여부
  const jobs = ['상경대', '문과대', '이과대', '자연대' , '법대' , '공과대', '교대', '인문대', '의과대', '약학대', '예술대', '체대', '항공대', '경찰대', '사관학교' ]; // 선택 가능한 옵션들
  const [selectedJob, setSelectedJob] = useState(''); // 사용자가 선택한 직업
  const [placeholder, setPlaceholder] = useState("학교를 입력해주세요.");
  const [typingMessage, setTypingMessage] = useState('');
  

  // 예시 학교 목록
  useEffect(() => {
    const schools = [
      "광주과학기술원", "가야대학교", "가야대학교", "가야대학교 김해캠퍼스", "가톨릭대학교", "감리교신대학교", "강남대학교",
      "강원대학교", "강원대학교 삼척캠퍼스", "건국대학교", "건국대학교 충주캠퍼스", "건동대학교", "건양대학교", "경기대학교",
      "경기대학교 서울캠퍼스", "경남대학교", "경동대학교", "경북대학교", "경북대학교 상주캠퍼스", "경상대학교", "경성대학교", "경운대학교", "가천대학교", "가천대학교 글로벌캠퍼스", "경일대학교", "경주대학교", "경찰대학교", "경희대학교",
      "경희대학교 수원캠퍼스", "경희사이버대학교", "계명대학교", "고려대학교", "고려대학교 세종캠퍼스", "고신대학교",
      "공군사관학교", "공주대학교", "관동대학교", "광신대학교", "광운대학교", "광주가톨릭대학교", "광주대학교", "국군간호사관학교",
      "국민대학교", "국제디지털대학교", "군산대학교", "그리스도대학교", "극동대학교", "금강대학교", "꽃동네현도사회복지대학교",
      "나사렛대학교", "남부대학교", "남서울대학교", "단국대학교", "단국대학교 천안캠퍼스", "대구가톨릭대학교", "대구대학교",
      "대구사이버대학교", "대구예술대학교", "대불대학교", "대신대학교", "대전가톨릭대학교", "대전대학교", "대전신학대학교",
      "대진대학교", "덕성여자대학교", "동국대학교", "동국대학교경주캠퍼스", "동덕여자대학교", "동서대학교", "동신대학교",
      "동아대학교", "동양대학교", "동의대학교", "루터대학교", "명신대학교", "명지대학교", "명지대학교 용인캠퍼스", "목원대학교",
      "목포가톨릭대학교", "목포대학교", "목포해양대학교", "배재대학교", "백석대학교", "부경대학교", "부산가톨릭대학교", "부산교육대학교", "부산대학교", "부산대학교밀양캠퍼스", "부산디지털대학교", "부산장신대학교",
      "삼육대학교", "상명대학교", "상명대학교천안캠퍼스", "상지대학교", "서강대학교", "서경대학교", "서남대학교", "서남대학교아산캠퍼스", "서울기독대학교", "서울대학교",
      "서울디지털대학교", "서울사이버대학교", "서울과학기술대학교", "서울신학대학교", "서울여자대학교",
      "서울장신대학교", "서원대학교", "서문대학교", "성결대학교", "성공회대학교", "성균관대학교", "성민대학교", "성신여자대학교", "세명대학교", "세종대학교",
      "세종사이버대학교", "수원가톨릭대학교", "수원대학교", "숙명여자대학교", "순천대학교", "순천향대학교",  "숭실대학교", "신경대학교", "신라대학교", "아세아연합신학대학교", "아주대학교",
      "안동대학교", "안양대학교", "연세대학교", "연세대학교 원주캠퍼스", "열린사이버대학교","영남대학교", "영남사이버대학교", "영남신학대학교", "영동대학교", "영산대학교", "영산대학교 부산캠퍼스", "영산선학대학교", 
      "예원예술대학교", "용인대학교", "우석대학교", "우송대학교", "울산대학교", "원광대학교", "원광디지털대학교", "위덕대학교", "육군사관학교", "을지대학교", "을지대학교 성남캠퍼스",
      "이화여자대학교", "인제대학교", "인천가톨릭대학교", "인천대학교", "인하대학교","장로회신학대학교", "전남대학교", "전남대학교여수캠퍼스", "전북대학교", "전주대학교",
      "제주대학교", "조선대학교", "중부대학교", "중앙대학교", "중앙대학교 안성캠퍼스","중앙승가대학교", "중원대학교", "진주산업대학교", "창원대학교", "청운대학교",
      "청주대학교", "초당대학교", "총신대학교", "충남대학교", "충북대학교","충주대학교", "침례신학대학교", "칼빈대학교", "탐라대학교", "평택대학교","한경대학교",
      "한국교원대학교", "한국국제대학교", "한국디지털대학교", "한국산업기술대학교", "한국성서대학교","한국항공대학교", "한국해양대학교", "한남대학교", "한동대학교", "한라대학교","한려대학교", "한림대학교", "한밭대학교", "한북대학교", "한서대학교",
      "한성대학교", "한세대학교", "한신대학교", "한양대학교", "한양대학교 ERICA캠퍼스","한양사이버대학교", "한영신학대학교", "한일장신대학교", "한중대학교", "해군사관학교",
      "협성대학교", "호남대학교", "호남신학대학교", "호서대학교", "호원대학교","홍익대학교", "홍익대학교 세종캠퍼스", "강원도립대학교", "경인여자대학교", "대전보건대학교",
      "경기공업대학교", "안양과학대학교", "한국종합예술학교", "명지전문대학교", "차의과학대학교","울산과학대학교", "동아방송예술대학교", "영남이공대학교", "대구한의대학교", "서울교육대학교",
      "성덕대학교", "광주보건대학교", "포항공과대학교", "한양여자대학교", "한국철도대학교","대림대학교", "두원공과대학교", "동의과학대학교", "대덕대학교", "동강대학교",
      "한국기술교육대학교", "여주대학교", "대구산업정보대학교", "김해대학교", "동아인재대학교","성화대학교", "경남도립남해대학교", "혜천대학교", "수원과학대학교", "공주교육대학교",
      "벽성대학교", "경민대학교", "춘해보건대학교", "삼육보건대학교", "공주영상대학교","부산예술대학교", "기독간호대학교", "서라벌대학교", "제주산업정보대학교", "전주기전대학교",
      "고구려대학교", "동우대학교", "부산경상대학교", "제주한라대학교", "강릉원주대학교", "구미1대학교", "포항대학교", "농협대학교", "조선간호대학교", "조선이공대학교",
      "대구공업대학교", "한국외국어대학교", "양산대학교", "진주보건대학교", "청주교육대학교","전남도립대학교", "백석문화대학교", "글로벌사이버대학교", "주성대학교", "대원대학교",
      "화신사이버대학교", "서울여자간호대학교", "유한대학교", "신구대학교", "세경대학교","거제대학교", "한국외국어대학교 용인캠퍼스", "국제대학교", "동원대학교", "한국관광대학교",
      "추계예술대학교", "신성대학교", "디지털서울문화예술대학교", "마산대학교", "대구미래대학교","경북도립대학교", "계명문화대학교", "부천대학교", "김천과학대학교", "동양미래대학교",
      "경복대학교", "제주관광대학교", "전남과학대학교", "강릉영동대학교", "영진사이버대학교","송곡대학교", "부산정보대학교", "부산외국어대학교", "한국재활복지대학교", "서울예술대학교",
      "전북과학대학교", "우송정보대학교", "한국과학기술원", "동서울대학교", "안동과학대학교","용인송담대학교", "영진전문대학교", "전주비전대학교", "한영대학교", "대구교육대학교",
      "제주대학교 사라캠퍼스", "경북전문대학교", "혜천대학교", "경남정보대학교", "청강문화산업대학교","아주자동차대학교", "백제예술대학교", "춘천교육대학교", "창원전문대학교", "경인교육대학교 안양캠퍼스",
      "재능대학교", "경북외국어대학교", "한국사이버대학교", "청양대학교", "경산1대학교", "오산대학교", "적십자간호대학교", "서강정보대학교", "한국방송통신대학교", "사이버한국외국어대학교",
      "진주교육대학교", "서해대학교", "신흥대학교", "강원관광대학교", "계원디자인예술대학교",  "서정대학교", "동남보건대학교", "금오공과대학교", "동부산대학교", "동주대학교",
      "대동대학교", "장안대학교", "상지영서대학교", "목포과학대학교", "광주교육대학교","광양보건대학교", "인하공업전문대학교", "송원대학교", "배화여자대학교", "대구외국어대학교",
      "대경대학교", "예수대학교", "선린대학교", "안산공과대학교", "대구과학대학교","김포대학교", "웅지세무대학교", "서울시립대학교", "동명대학교", "군장대학교",
      "충청대학교", "광주여자대학교", "창신대학교", "군산간호대학교", "원광보건대학교","한국승강기대학교", "인덕대학교", "수원여자대학교", "천안연암대학교", "충북도립대학교",
      "경북과학대학교", "서일대학교", "안산1대학교", "가톨릭상지대학교", "송호대학교","김천대학교", "부산여자대학교", "경인교육대학교", "극동정보대학교", "영남외국어대학교",
      "한림성심대학교", "세계사이버대학교", "한국체육대학교", "경남도립거창대학교", "순천제일대학교","연암공업대학교", "숭의여자대학교", "울산과학기술원", "문경대학교", "대구보건대학교",
      "가천대학교 메디컬캠퍼스", "순천청암대학교"

    ];
    
    if (schoolInput) {
      setAutoCompleteOptions(schools.filter(school => school.toLowerCase().includes(schoolInput.toLowerCase())));
    } else 
     { setAutoCompleteOptions([]);
    }
  }, [schoolInput]);

  const handleJobSelect = (job) => {
    setSelectedJob(job); // 선택한 직업을 상태에 저장합니다.
    setShowJobOptions(false); // 옵션 목록을 숨깁니다.
  };

 

  useEffect(() => {
    if (isTyping) {
      if (typingText.length < typingMessage.length) {
        const nextChar = typingMessage[typingText.length];
        const timeoutId = setTimeout(() => {
          setTypingText((text) => text + nextChar);
        }, typingSpeed);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false); // 타이핑이 완료되면 상태를 업데이트합니다.
      }
    }
  }, [typingText, typingMessage, isTyping]);
  

  
  

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setSchoolInput(school);
    setShowSchoolOptions(false);
    setTypingText('');
    setTypingMessage(`나는 ${school} 학생이야!`);
    setIsTyping(true);
  };

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    // '다음' 버튼 클릭 시에 실행될 로직
    // 학교와 학과가 모두 선택되었는지 확인합니다.
    if (selectedSchool && selectedJob) {
      // 학교와 학과가 모두 선택되었다면, 다음 페이지로 이동합니다.
      navigate('/login/information/Welcome05'); // '/welcome05' 경로로 이동
    } else {
      // 학교나 학과 중 하나라도 선택되지 않았다면, 사용자에게 알림을 표시합니다.
      alert("학교와 학과를 모두 선택해주세요.");
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
       <div className='received'>
      <SplitMessage message={message} splitIndex={fullMessage1.length} />
    </div></div> </div>
    <div className="typing-container">
      <div className="message typing">
        <div className="message-content">{typingText}</div>
      </div>
      </div>
     
      

      <div className="SchoolSelectionButton">
      <div className="input-wrapper"> {/* 새로 추가된 div */}
      <input
  className="school-selection"
  value={schoolInput}
  onChange={(e) => {
    setSchoolInput(e.target.value);
    if (e.target.value) {
      setShowSchoolOptions(true);
    } else {
      setShowSchoolOptions(false);
    }
  }}
  placeholder={placeholder}
  onFocus={() => setPlaceholder('')} // 플레이스홀더를 비워줍니다.
  onBlur={() => {
    if (!schoolInput) {
      setPlaceholder("학교를 입력해주세요."); // 사용자가 입력을 하지 않았을 때 플레이스홀더를 복원합니다.
    }
  }}
/>

    {showSchoolOptions && autoCompleteOptions.length > 0 && (
      <div className="schooloptions">
        {autoCompleteOptions.map((school) => (
          <div key={school} onClick={() => handleSchoolSelect(school)} className="schoolselectoptions">
            {school}
          </div>
        ))}
      </div>
    )}
  </div>
      </div>
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

export default Welcome04;