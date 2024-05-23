import {React, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const KakaoLoginComponent = ({ code }) => {

  console.log(code);
  const navigate = useNavigate();

  useEffect(() => {
    const KakaoClick = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `https://api.catchmenow.co.kr/main/kakaoLogin/`,
          data: { code: code }
        });

        const token = response.data.tokens;

        // 하나씩 저장해야 저장됨
        localStorage.setItem("accessToken", token.access);
        localStorage.setItem("refreshToken", token.refresh);
        localStorage.setItem("kid", token.kid);

      } catch (error) {
        console.log("소셜로그인 에러", error);
      }
    };

    KakaoClick();  // 함수를 직접 호출하도록 함
  }, [code, navigate]);

  return null;
};

export default KakaoLoginComponent;
