import {React, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const KakaoLoginComponent = ({ code }) => {

  const navigate = useNavigate();
  console.log(code)

  useEffect(() => {
    const KakaoClick = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/main/kakaoLogin`,
          data: { code: code }
        });

        const kid = response.data.user.kid;
        const token = response.data.tokens;

        localStorage.setItem("kid", kid);
        localStorage.setItem("token", token);

        navigate("/login");
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
