import { useState } from "react";
import "./MyProfile.css";

const myinformation = {
  id: 1,
  nickname: "w99_hyun_",
  gender: "남",
  height: "184cm",
  weight: "72kg",
  age: "26",
  univ: "서울대학교",
  home: "강남구",
  certify: "true",
  animal: "고양이상",
};

function MyProfile() {
  const [myNickname, setMyNickname] = useState(""); // myNickname 상태와 해당 상태를 업데이트하는 함수를 정의합니다.
  return (
    <div className="myprofile-container">
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
    </div>
  );
}

export default MyProfile;

// <div>
//         <button onClick={() => setMyNickname("Default Nickname")}>
//           Set Default Nickname
//         </button>
//         <input
//           placeholder={myNickname}
//           value={myNickname}
//           onChange={(e) => setMyNickname(e.target.value)}
//         />
//       </div>
