import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const KakaoLoginComponent = ({ code }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const KakaoClick = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `https://api.catchmenow.co.kr/main/kakaoLogin/`,
          data: { code: code },
        });

        const token = response.data.tokens;

        // 하나씩 저장해야 저장됨
        localStorage.setItem("accessToken", token.access);
        localStorage.setItem("refreshToken", token.refresh);
        localStorage.setItem("kid", token.kid);

        console.log(token.kid);

        // 로그인 성공 후 main으로 이동
        navigate("/meetingroommain");
      } catch (error) {
        console.log("로그인 에러", error);
      }
    };

    KakaoClick(); 
  }, [code, navigate]);

  return null;
};

export default KakaoLoginComponent;
