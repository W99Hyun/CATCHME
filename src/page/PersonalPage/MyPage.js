import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();

  const editMyInfo = () => {
    navigate("/login/information/Welcome03");
  };

  const editIdealInfo = () => {
    navigate("/");
  };

  const manageFriends = () => {
    navigate("/login/withfriends");
  };

  return (
    <div>
      <div className="mypage-header">
        <span className="mypage-text">마이페이지</span>
      </div>
      <div className="myprofile">
        <div className="mypage-container">
          <div className="mypage-nick-level">
            <span className="mypage-nickname">바보맨 님</span> <br />
            <span className="mypage-level">Lv. 8</span>
          </div>
          <div className="mypage-img-container">
            <img
              src={`${process.env.PUBLIC_URL}/image/profileCard/otterCard.png`}
              className="mypage-img"
            />
          </div>
          <div className="mypage-btns">
            <button className="mypage-btn1" onClick={editMyInfo}>
              나의 정보 수정하기
            </button>
            <button className="mypage-btn2" onClick={editIdealInfo}>
              이상형 정보 수정하기
            </button>
            <button className="mypage-btn3" onClick={manageFriends}>
              친구 관리
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
