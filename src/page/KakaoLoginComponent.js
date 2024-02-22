import {React, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const KakaoLoginComponent = ({ code }) => {
  console.log('Code:', code);

  const navigate = useNavigate();

  useEffect(() => {
    const KakaoClick = async () => {
      try {
        console.log("Attempting Kakao login with code:", code);

        const response = await axios({
          method: "GET",
          url: `http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/main/kakaoLoginLogicRedirect` + `/?code=${code}`,
        });

        
        console.log("Kakao login response:", response);

        const kid = response.data.user.kid;
        const token = response.data.tokens;

        console.log("Received kid and token:", kid, token);

        localStorage.setItem("kid", kid);
        localStorage.setItem("token", token);

        console.log("Navigating to /login");
        navigate("/login");
      } catch (error) {
        console.log("소셜로그인 에러", error);
        window.alert("로그인에 실패하였습니다.");
      }
    };

    KakaoClick();  // 함수를 직접 호출하도록 함
  }, [code, navigate]);

  return (
    // JSX를 반환하는 부분
    <div>
      <p>KakaoLoginComponent Rendering</p>
    </div>
  );
};

export default KakaoLoginComponent;
