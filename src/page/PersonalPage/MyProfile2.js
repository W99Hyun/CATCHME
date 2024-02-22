import { useNavigate } from "react-router-dom";
import "./MyProfile2.css";

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

function MyProfile2() {
  const navigate = useNavigate();
  const modifyProfile = function () {
    navigate("/");
  };
  const modifyPrefer = function () {
    navigate("/");
  };

  return (
    <div>
      <div className="myprofile2-header">
        <span className="myprofile2-text">마이페이지</span>
      </div>
      <div className="myprofile2-container">
        <div className="myprofile2-myinfo">
          <div className="myprofile2-myinfo-detail">
            <div className="myprofile2-myinfo-first">
              <div className="myprofile2-myinfo-img-container ">
                <img
                  src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                  className="myprofile2-myinfo-img"
                />
              </div>
              <div className="myprofile2-myinfo-nickname">
                <span>r___eve님</span>
              </div>
              <div>
                <button className="myprofile2-myinfo-modify-button">
                  수정하기
                </button>
              </div>
            </div>
            <div className="myprofile2-myinfo-logout">
              다른계정으로 로그인하기 LOGOUT
            </div>
          </div>
          <div className="myprofile2-modify-container ">
            <div>
              <button
                className="myprofile2-modify-button"
                onClick={modifyProfile}
              >
                개인정보 수정하기
              </button>
            </div>
            <div>
              <button
                className="myprofile2-modify-button"
                onClick={modifyPrefer}
              >
                나의 취향 정보 수정하기
              </button>
            </div>
            <div>
              <button
                className="myprofile2-modify-button"
                onClick={modifyPrefer}
              >
                이상형 정보 수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile2;
