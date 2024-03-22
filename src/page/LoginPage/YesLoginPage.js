import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EnterRoomModal from "../EnterRoomModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./YesLoginPage.css";
import KakaoLoginComponent from "../KakaoLoginComponent";

const BackgroundImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/spaceBackground3.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;

  @media screen and (min-width: 320px) and (max-width: 1439px) {
    background-size: contain;
  }
`;

const PlanetImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/planet2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  animation: rotateClockwise 30s linear infinite;
  position: fixed;
  margin: -10% auto;
  z-index: -1;

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ModalButton = styled.button`
  padding: 10px 15px;
  width: 245px;
  height: 70px;
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #3b3b3b;
  border-radius: 44px;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartText = styled.span`
  color: #515151;
  font-size: 28px;
  font-weight: bold;
`;

function YesLogin() {
  const [code, setCode] = useState(null);
  const [wmbti, setWMbti] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    setCode(code);
  }, []);

  const userName = "r___eve";
  const navigate = useNavigate();

  const kid = localStorage.getItem("kid"); // 로컬스토리지에 있는 kid 빼오기

  const fetchData = async () => {
    try {
      const userResponse = await fetch(
        `https://api.catchmenow.co.kr/main/api/user_info/${kid}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const userdata = await userResponse.json();
      setWMbti(userdata.extra_info[0].w_mbti);
      console.log(userdata.extra_info[0].w_mbti)
    } catch (error) {
      console.error("Error fetching ideal percentages:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    if (wmbti) {
      // w_mbti가 존재하면 모달을 열기
      setShowModal(!showModal);
    } else {
      // w_mbti가 존재하지 않으면 "/login/information"으로 라우팅
      navigate("/login/information");
    }
  };

  return (
    <>
      {code && <KakaoLoginComponent code={code} />}
      <BackgroundImage />
      <PlanetImage />
      <div className="yeslogin-container">
        <div></div>
        <div className="yeslogin-wellcome-text">{`어서오세요!! ${userName}님.`}</div>
        <div></div>
        <div></div>
        <div></div>
        <div className="yeslogin-btn">
          <div>
            <div>
              <ModalButton
                onClick={() => {
                  toggleModal();
                }}
              >
                <StartText> 지금 시작하기 </StartText>
              </ModalButton>
              <EnterRoomModal isOpen={showModal} onClose={toggleModal} />
            </div>
            <div className="yeslogin-logout-text">
              <Link to="/" className="yeslogin-logout-text">
                LOGOUT
              </Link>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default YesLogin;