import React from "react";
import styled from "styled-components";

const WarningModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const WarningModal = ({ message, onConfirm, onCancel }) => {
  return (
    <WarningModalContainer>
      <p>{message}</p>
      <button onClick={onConfirm}>나가기</button>
      <button onClick={onCancel}>취소</button>
    </WarningModalContainer>
  );
};

export default WarningModal;
