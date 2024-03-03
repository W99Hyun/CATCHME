import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import "./LoadingPage.css";

const BackgroundImage = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/image/spaceBackground.png);
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
          <img
            src={`${process.env.PUBLIC_URL}/image/planet.png`}
            className="planet-img"
          />
          <BackgroundImage />
        </div>
      )}
    </div>
  );
}

export default Loading;
