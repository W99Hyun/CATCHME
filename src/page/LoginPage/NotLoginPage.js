import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NotLoginPage.css";
import styled from "styled-components";

const kakaoParams = new URLSearchParams({
  client_id: "273e3f916e59df62a965cb94d235f29e",
  redirect_uri: "http://localhost:3000/login",
  response_type: "code",
});
const kParams = new URLSearchParams(kakaoParams).toString();

const BackgroundImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/background2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  @media screen and (min-width: 320px) and (max-width: 1439px) {
    background-size: contain;
  }
`;

const KakaoLoginButton = styled.button.attrs(props => ({
  as: "a",
  href: `https://kauth.kakao.com/oauth/authorize?${kParams}`
}))`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: none; /* a 태그의 기본 밑줄 스타일 제거 */
`;

function NotLogin({ onLogin }) {

  return (
    <div>
      <BackgroundImage />
      <div className="notlogin-container">
        <div></div>
        <div></div>
        <div>
          <p className="notlogin-text">
            간편하게 로그인하고
            <br />
            지금바로 시작하세요.
          </p>
        </div>
        <div></div>
        <div>
          <div className="notlogin-kakao-image">
          <KakaoLoginButton>
            <img
              src={`${process.env.PUBLIC_URL}/image/kakao/kakaoLogin.png`}
              alt="Kakao Login Button"
            />
          </KakaoLoginButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotLogin;
