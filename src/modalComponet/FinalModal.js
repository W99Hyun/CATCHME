import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    width: "95%", 
    height: "55%", 
    borderRadius: "18px",
    background: "#FFF",
    boxShadow: "0px 0px 22px 0px rgba(0, 0, 0, 0.10)",
    display: "grid",
    gridTemplateRows: "repeat(4, 1fr)",
  },
  dayText: {
    gridColumn: "1", 
    fontSize: "24px",
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
  font-size: 17px;
  font-weight: 900;
  width: 100%;
  height: 40%;
`;

const KakaoPaymentImage = styled.img`
  width: 20%;
  height: 30%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 9px;
  cursor: pointer; 
`;

const FinalModal = ({ isOpen, onClose, me, you}) => {
  const [meData, setMeData] = useState(null);
  const [youData, setYouData] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId, setData) => {
      try {
        const response = await fetch(
          `http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/main/api/user_info/${userId}`,
          {
            method: "GET",
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData(me, setMeData);
    fetchUserData(you, setYouData);
  }, [me, you]);


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
            src={getImagePath1(me.animal)} 
            alt={`${me.animal} 이미지`}
            style={{ width: "70px", height: "70px" }}
        />
        <img 
            src={getImagePath2(you.animal)} 
            alt={`${you.animal} 이미지`}
            style={{ width: "70px", height: "70px" }}
        />
      </ConfirmText1>
      <ConfirmText2>
        <br />
        축하해요!
        <br /> <br />
        간편 결제 후 카톡으로 내 이상형을 만나봐요
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
