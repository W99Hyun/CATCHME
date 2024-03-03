/*
이제 필요없는 페이지
*/
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import "./LoadingPage.css";

const BackgroundImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/spaceBackground2.png);
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

const PlanetImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/planet.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  animation: rotateClockwise 30s linear infinite;
  position: fixed;
  margin: auto;
  z-index: 1;

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function Loading() {
  const [time, setTime] = useState(false);
  const timer = setTimeout(() => {
    setTime(true);
  }, 2000);

  return (
    <div>
      {time ? (
        <Navigate to="/notlogin" />
      ) : (
        <div>
          <PlanetImage />
          <BackgroundImage />
        </div>
      )}
    </div>
  );
}

export default Loading;
