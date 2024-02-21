import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  content: {
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    width: "95%", 
    height: "50%", 
    borderRadius: "18px",
    border: "none",
    background: "#FFF",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.05)",
    display: "grid",
    gridTemplateRows: "repeat(4, 1fr)",
  },
  dayText: {
    gridColumn: "1", 
    fontSize: "30px",
    fontWeight: "bold",
    margin: "auto",
    color: "#DA8BAC",
  },
};

const ConfirmText1 = styled.div`
  color: #474747;
  width: 100%;
  height: 40%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  img {
    width: 100px;
    height: 100px;
    animation: pop 0.5s ease-in-out infinite alternate;
  }

  @keyframes pop {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
`;

const ConfirmText2 = styled.div`
  color: #474747;
  text-align: center;
  font-size: 15px;
  font-weight: 900;
  width: 100%;
  height: 40%;
  margin-top: 10px;
  span {
    font-size: 22px;
    font-weight: 900;
  }
`;

const KakaoPaymentImage = styled.img`
  width: 20%;
  height: 30%;
  margin: 0 auto;
  margin-top: 25px;
  border-radius: 9px;
  cursor: pointer; 
`;

const FinalModal = ({ isOpen, onClose, me, you}) => {
  console.log(me)
  console.log(you)

    const getImagePath1 = (animal) => {
      return `/image/profile/${animal.toLowerCase()}${"Male"}.png`;
    };

    const getImagePath2 = (animal) => {
      return `/image/profile/${animal.toLowerCase()}${"Female"}.png`;
    };

    const handleKakaoPayClick = () => {
      window.location.href = 'http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/kakaopay/kakaoPaylogic/';
    };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div style={customStyles.dayText}>Congratulations !</div>
      <ConfirmText1>
        <img 
            src={getImagePath1(me)} 
            alt={`${me.animal} 이미지`}
            style={{ width: "85px", height: "85px" }}
        />
        <img 
            src={getImagePath2(you)} 
            alt={`${you.animal} 이미지`}
            style={{ width: "85px", height: "85px" }}
        />
      </ConfirmText1>
      <ConfirmText2>
        <br />
        <span> 축하해요! </span>
        <br /> <br />
        간편 결제 후 카톡으로 내 이상형을 만나보세요
      </ConfirmText2>
      <KakaoPaymentImage
        src="/image/kakaopay.png"
        alt="Kakao Payment"
        onClick={handleKakaoPayClick}
      />
    </Modal>
  );
};

export default FinalModal;
