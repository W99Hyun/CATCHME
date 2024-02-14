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
  return (
    <div>
      <div className="myprofile-header">
        <span className="myprofile-text">마이페이지</span>
      </div>
      <div className="myprofile-container">
        <div className="myprofile-myinfo">
          <div className="myprofile-myinfo-first">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                className="myprofile-myinfo-img"
              />
            </div>
            <div className="myprofile-myinfo-nickname">
              <span>r___eve님</span>
            </div>
            <div>
              <button className="myprofile-myinfo-modify-button">
                수정하기
              </button>
            </div>
          </div>

          <div className="myprofile-myinfo-second">
            <div className="myprofile-myinfo-body">
              <div>{myinformation.height}</div>
              <div>{myinformation.weight}</div>
              <div>{myinformation.age}</div>
            </div>
            <div className="myprofile-myinfo-univ">
              {myinformation.univ} 재학중
              <span className="myprofile-certify">
                {myinformation.certify ? " 위치인증 완료" : " 위치인증 미완료"}
              </span>
            </div>
            <div className="myprofile-myinfo-univ">{myinformation.home}</div>
            <div className="myprofile-myinfo-univ">{myinformation.animal}</div>
            <div></div>
            <div>
              <button className="myprofile-done-button">완료하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
