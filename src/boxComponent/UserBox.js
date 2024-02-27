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

const UserBox = ({ users, dataSocket }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const getImagePath = (animal, gender) => {
    return `/image/profile/${animal.toLowerCase()}${
      gender === "Male" ? "Male" : "Female"
    }.png`;
  };

  const getIdealImagePath = (animal, gender) => {
    return `/image/profile/${animal.toLowerCase()}${
      gender === "Male" ? "Male" : "Female"
    }Good.png`;
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
      dataSocket.current.send(JSON.stringify({ type: 'selected_bubble', chat: text }));
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
            src={
              /*user.idealScore > 50*/ false
                ? getIdealImagePath(user.animal, user.gender)
                : getImagePath(user.animal, user.gender)
            }
            alt={`${user.animal} 이미지`}
            style={{
              width: /*user.idealScore > 50 */ false ? "78px" : "62px",
              height: /*user.idealScore > 50 */ false ? "78px" : "62px",
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
