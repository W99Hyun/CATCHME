import {React, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const KakaoLoginComponent = ({ code }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const KakaoClick = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `https://api.catchmenow.co.kr/main/kakaoLogin/
          `,
          data: { code: code }
        });

        const token = response.data.tokens;

        localStorage.setItem("token", token);
        localStorage.setItem("kid", token.kid);

        const tokens = localStorage.getItem("token");

        console.log(tokens)

      } catch (error) {
        console.log("소셜로그인 에러", error);
        window.alert("로그인에 실패하였습니다.");
      }
    };

    KakaoClick();  // 함수를 직접 호출하도록 함
  }, [code, navigate]);

  return null;
};

export default KakaoLoginComponent;
