import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    top: "65%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "3.5%",
    borderRadius: "10%",
    padding: "5px",
    boxShadow: "4px 4px 20px 0px rgba(0, 0, 0, 0.22)",
  },
};

const UserBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  cursor: ${({ isMe }) => (isMe ? "pointer" : "default")};
`;

const ModalText = styled.div`
  color: #000;
  text-align: center;
`;

const speechBubbleImages = {
  good: "good.png",
  heart: "heart.png",
  hello: "hello.png",
  love: "love.png",
  mad: "mad.png",
  oh: "oh.png",
  sad: "sad.png",
  sorry: "sorry.png",
  star: "star.png",
};

const SpeechBubble = styled.img`
  width: 23px;
  height: 15px;
  margin-top: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const UserBox = ({ users, dataSocket, isMale }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [highestIdealPercentageUser, setHighestIdealPercentageUser] = useState(null);

  useEffect(() => {
    // 이상형 퍼센트 조회 및 가장 높은 퍼센트 사용자 설정
    const fetchHighestIdealPercentageUser = async () => {
      try {
        const response = await fetch(
          `https://api.catchmenow.co.kr/room/api/room_info/room/percentage/`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ideal percentages");
        }

        const idealPercentagesData = await response.json();

        // 여기서 가장 높은 이상형 퍼센트를 가진 사용자를 찾음
        const highestPercentageUser = idealPercentagesData.reduce((prev, current) => {
          return prev.matching_count > current.matching_count ? prev : current;
        }, {});
        setHighestIdealPercentageUser(highestPercentageUser);
      } catch (error) {
        console.error("Error fetching ideal percentages:", error);
      }
    };

    fetchHighestIdealPercentageUser();
  }, [isMale]);

  const getImagePath = (animal, gender, isHighestIdealPercentageUser) => {
    if (isHighestIdealPercentageUser) {
      return `/image/special/${animal.toLowerCase()}${gender === "Male" ? "Male" : "Female"}Good.png`;
    }

    return `/image/profile/${animal.toLowerCase()}${gender === "Male" ? "Male" : "Female"}.png`;
  };

  const handleUserClick = (user) => {
    if (user.user === 1001) {
      //setSelectedUser(user); 나중엔 이걸로
      setSelectedUser({
        ...user,
        chat: ["hello", "heart", "oh", "love", "sad"],
      });
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleSpeechBubbleClick = async (text) => {
    dataSocket.current.send(JSON.stringify({ type: 'selected_bubble', chat: text, kid: 1001 }));
  };

  return (
    <UserBoxContainer>
      {users.map((user, index) => (
        <UserItem
          key={index}
          isMe={user.user === 1001}
          onClick={() => handleUserClick(user)}
        >
          <img
            src={ getImagePath(user.animal, user.gender, user.user === highestIdealPercentageUser?.id)}
            alt={`${user.animal} 이미지`}
            style={{
              width: "62px",
              height: "62px",
            }}
          />
        </UserItem>
      ))}

      {selectedUser && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <ModalText>
            {selectedUser.chat.map((text, index) => (
              <SpeechBubble
                key={index}
                src={`/image/chat/${speechBubbleImages[text]}`}
                onClick={() => handleSpeechBubbleClick(text)}
              />
            ))}
          </ModalText>
        </Modal>
      )}
    </UserBoxContainer>
  );
};

export default UserBox;
