import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import YesLoginModal from "../modalComponet/MenubarModal";
import WarningModal from "../modalComponet/WarningModal";

const RoomHeader = ({ isUserLoggedIn }) => {
  const kid = localStorage.getItem("kid");
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const openWarningModal = () => {
    setShowWarningModal(true);
  };
  
  const closeWarningModal = () => {
    setShowWarningModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await fetch(
        `https://api.catchmenow.co.kr/main/api/user_info/${kid}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        }
      );
      const userData = await userResponse.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const updateUserReadyStatus = async (userkid) => {
    try {
      const response = await fetch(`https://api.catchmenow.co.kr/main/api/user_info/${kid}/leaving_room`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user ready status');
      }

    } catch (error) {
      console.error('Error updating user ready status:', error);
      throw error;
    }
  };

  const handlePageBack = () => {
    if (location.pathname.startsWith("/room/")) {
      setShowWarningModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleLeaveRoom = () => {
    updateUserReadyStatus(kid);
    setShowWarningModal(false)
    navigate("/meetingroommain");
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  if (!isUserLoggedIn || location.pathname === "/") {
    return null; // 로그인되지 않은 경우 헤더를 렌더링하지 않음
  }

  return (
    <HeaderContainer>
      <Arrow
        src="/image/navigationbar/backButton.png"
        alt="Back Arrow"
        onClick={handlePageBack}
      />
      <Logo src="/image/Logo.png" alt="Catchme Logo" />
      <Alarm
        src="/image/navigationbar/alarmIcon.png"
        alt="alarm Dots"
        onClick={() => navigate("/login/alarm")}
      />
      <Setting
        src="/image/navigationbar/Group17.png"
        alt="Setting Dots"
        onClick={openModal}
      />
      {modalIsOpen && (
        <YesLoginModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
      {showWarningModal && (
        <WarningModal
          message="방을 나가시겠습니까?"
          onConfirm={handleLeaveRoom}
          onCancel={() => setShowWarningModal(false)}
        />
      )}
    </HeaderContainer>
  );
};

export default RoomHeader;

const HeaderContainer = styled.header`
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
`;

const Arrow = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  position: absolute;
  margin-left: 3rem;
  margin-right: 23rem;
  top: 50%;
  transform: translateY(-50%);
`;

const Logo = styled.img`
  width: 10rem;
  height: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Alarm = styled.img`
  width: 29px;
  height: 26px;
  cursor: pointer;
  top: 34%;
  position: absolute;
  right: 2.9rem;
  transform: translateX(-50%);
`;

const Setting = styled.img`
  width: 1.3125rem;
  height: auto;
  cursor: pointer;
  top: 50%;
  position: absolute;
  right: 0.69rem;
  transform: translateX(-50%);
`;
