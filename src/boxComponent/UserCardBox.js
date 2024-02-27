import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const customModalStyle = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    backgroundColor: "rgba(246, 244, 241, 0.8)",
    top: "50%", // 수직 위치를 화면의 중간으로 조정
    left: "50%", // 수평 위치를 화면의 중간으로 조정
    transform: "translate(-50%, -50%)", // 말풍선을 가운데로 정렬
    width: "70%",
    height: "52%",
    borderRadius: "7%",
    padding: "5px",
    boxShadow: "4px 4px 11px 0px rgba(0, 0, 0, 0.22)",
    border: "2px solid",
  },
};

const CustomModalContent = styled.div`
  display: grid;
  gap: 20px;
  margin: 15px;
`;

const FirstGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
`;

const Profile = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: block;
`;

const Text1 = styled.div`
  color: #000;
  font-size: 28px;
  font-weight: 900;
  span {
    font-size: 17px;
  }
`;

const Text2 = styled.div`
  color: #999;
  font-size: 8px;
  span {
    color: #000;
    font-weight: 900;
    font-size: 17px;
  }
`;

const Text3 = styled.div`
  color: #444;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
`;

const Text4 = styled.div`
color: #242424;
text-align: center;
font-size: 17px;
font-weight: 700;
span {
  color: #E296B6;
}
`;

const UserCardBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const UserCardItem = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${props => props.bgColor};
  cursor: pointer;
`;

const UserCardInfo = styled.div`
  font-size: 11px;
  margin-top: 5px;
  font-weight: 900;
  text-align: left;
`;

const colors = [
  "#C5E7CF",
  "#FAF4C2",
  "#D2E0FB",
  "#EFCBDA",
  "#E0D6FD",
];

const NextButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  padding: 5px 15px;
  color: #515151; /* 버튼 텍스트 색상 */
  font-size: 13px;
  font-weight: bold;
  background: transparent;
  border: 2px solid #515151;
  border-radius: 20px;
  cursor: pointer;
`;

const PrevButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  padding: 5px 15px;
  color: #515151; /* 버튼 텍스트 색상 */
  font-size: 13px;
  font-weight: bold;
  background: transparent;
  border: 2px solid #515151;
  border-radius: 20px;
  cursor: pointer;
`;

const UserCardBox = ({ users, gender }) => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getImagePath = (animal, gender) => {
    // 나중에 프로필카드로 변경
    return `/image/profile/${animal.toLowerCase()}${gender === 'Male' ? 'Male' : 'Female'}.png`;
  };

  const openModal = (user, gender) => {
    setSelectedUser(user, gender);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <UserCardBoxContainer>
       {Array.from({ length: 5 }).map((_, index) => {
        const user = users[index];
        return (
        <UserCardItem 
        key={index} 
        bgColor={colors[index % colors.length]} // 나중에 유저 고유 ID값(정수) 이용하여 색상 선택
        onClick={() => openModal(user, gender)}
        >
          {user ? (
              <>
          <UserCardInfo>
            {user.school} {user.major}
          </UserCardInfo>
          <img src={getImagePath(user.animal, user.gender)} 
           alt={`${user.animal} 이미지`}
           style={{ width: "65px", height: "65px", margin: "0 auto", display: "block",}}
          />
          </>
          ) : (
            <>
            <div></div>
            <img
                src="/image/profileCard/luaCard.png"
                alt="기본 프로필 이미지"
                style={{ width: "70px", height: "110px" }}
              />
            </>
            )}
        </UserCardItem>
        );
          })}

      <Modal isOpen={selectedUser !== null} onRequestClose={closeModal} style={customModalStyle}>
        {selectedUser !== null && (
          <CustomModalContent>
            <Text1> 
              NAME : {selectedUser.nickname}
              <Text2> 
              <span> {selectedUser.school} {selectedUser.major} </span>
              <br />
              대학교 인증 완료 </Text2>
            </Text1>
            <Profile
              src={getImagePath(selectedUser.animal, selectedUser.gender)}
              alt={`${selectedUser.animal} 이미지`}
            />
            <div>
              {currentPage === 1 && (
                  <>
                    <Text3>
                      {selectedUser.mbti} <br />
                      {selectedUser.height} / {selectedUser.body} / {selectedUser.age}살 <br />
                      {selectedUser.hobby}
                    </Text3>
                    <br />
                    <NextButton onClick={handleNextPage}>다음 페이지로 </NextButton>
                  </>
                )}
                {currentPage === 2 && (
                  <>
                    <Text3>
                      {selectedUser.location} <br />
                      {selectedUser.m_hobby} <br />
                      쌍커풀 유무: {selectedUser.eyes}
                    </Text3>
                    <br />
                    <PrevButton onClick={handlePrevPage}>이전 페이지로 </PrevButton>
                    <NextButton onClick={handleNextPage}>다음 페이지로 </NextButton>
                  </>
                )}
                {currentPage === 3 && (
                <>
                  <Text3>
                    자기소개 <br />
                    {selectedUser.free}
                  </Text3>
                  <br />
                  <PrevButton onClick={handlePrevPage}>이전 페이지로 </PrevButton>
                </>
              )}
            </div>
            
          </CustomModalContent>
        )}
      </Modal>

    </UserCardBoxContainer>
  );
};

export default UserCardBox;
