import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ReadyBoxContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr; /* 3개의 열로 구성 */
`;

const LeftButton = styled.button`
grid-column: 1;
grid-row : 3;
justify-self: left;
max-width: 30%;
height:50%;
border: none;
border-radius: 25px;
background: #FAFAFA;
box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.10);
margin: 10px;
`;

const CenterButton = styled.button`
grid-column: 2;
grid-row: 2;
width: 150px;
height: 100%;
margin: 0 auto;
border-radius: 16px;
border: 2px solid #3B3B3B;
background: ${({ isReady }) => (isReady ? "#FCFF71" : "#B2D3FB")};
box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.15);
`;

const LeftText = styled.span`
color: #000;
font-size: 12px;
font-weight: 700;
`;

const ReadyText = styled.span`
color: #3C3C3C;
font-family: Inter;
font-size: 23px;
font-weight: 900;
letter-spacing: 0.92px;
`;

const ReadyBox = ( { onGenderChange, isMale, onReadyButtonClick, isReady } ) => {

  const [isMaleUser, setMale] = useState(isMale);

  const handleReadyClick = () => {
    onReadyButtonClick();
  };

  const handleGenderChange = () => {
    setMale(!isMaleUser);
    onGenderChange(!isMaleUser);
  };

  return (
    <ReadyBoxContainer>
      <LeftButton onClick={handleGenderChange}>
      <LeftText>{isMaleUser ? "남" : "여"}</LeftText>
        </LeftButton>
      <CenterButton isReady={isReady} onClick={handleReadyClick}>
        <ReadyText>{isReady ? "CANCEL !" : "READY !"}</ReadyText>
      </CenterButton>
    </ReadyBoxContainer>
  );
};

export default ReadyBox;
