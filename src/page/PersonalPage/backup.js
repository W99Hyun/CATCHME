<div className="mypage-header">
        <span className="mypage-text">마이페이지</span>
      </div>
      <div className="mypage-container">
        <div className="mypage-myinfo-block">
          <div
            className="mypage-myinfo-first mypage-myinfo-detail"
            onClick={goMyProfile}
          >
            <div>
              <div className="mypage-myinfo-first-detail">
                <div className="mypage-myinfo-img-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                    className="mypage-myinfo-img"
                  />
                </div>
                <div className="">
                  <div className="mypage-myinfo-nickname-container">
                    <span className="mypage-myinfo-nickname">r___eve님 </span>{" "}
                    <br />
                    <span>LV.8</span>
                  </div>
                </div>
                <div className="mypage-myinfo-modify-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/personalpage/personalarrow.png`}
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="mypage-myinfo-logout">
              다른계정으로 로그인하기 LOGOUT
            </div>
          </div>
          <div></div>
          <div className="mypage-block"></div>
          {/* <div className="mypage-myinfo-second">
            <div className="mypage-myinfo-body">
              <div>{myinformation.height}</div>
              <div>{myinformation.weight}</div>
              <div>{myinformation.age}</div>
            </div>
            <div className="mypage-myinfo-univ">
              {myinformation.univ} 재학중
              <span className="mypage-certify">
                {myinformation.certify ? " 위치인증 완료" : " 위치인증 미완료"}
              </span>
            </div>
            <div className="mypage-myinfo-univ">{myinformation.home}</div>
          </div> */}
        </div>
        <div className="mypage-container-col">
          <div className="mypage-friends-manage">
            <img
              src={`${process.env.PUBLIC_URL}/image/personalpage/manageicons.png`}
              className="mypage-image-container"
            />
          </div>

          <div className="mypage-friends-manage">
            <img
              src={`${process.env.PUBLIC_URL}/image/personalpage/managefriends.png`}
              className="mypage-image-container"
              onClick={goWithFriends}
            />
          </div>
        </div>
        <div>
          <div className="coin-container">
            <div>
              <p>보유코인: </p>
            </div>
            <p>7,000c</p>
            <div>
              <p>
                <button className="mypage-charge-button">충전하기</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      ///////////////////////////
      .mypage-header {
        display: flex;
        padding: 16px;
        align-items: center;
      }
      
      .mypage-text {
        font-size: 25px;
        font-weight: bold;
        text-decoration: none;
        color: rgb(60, 57, 57);
        text-align: center;
      }
      
      .mypage-container {
        display: grid;
        grid-template-rows: 4fr 2.5fr 1.5fr;
        gap: 10px;
        margin: 5px;
        padding: 0px;
        min-height: 80vh;
      }
      
      .mypage-myinfo-block {
        display: grid;
        grid-template-rows: 1.3fr 0.2fr 0.4fr 0.1fr;
      }
      .mypage-myinfo-detail {
        gap: 10px;
        border-radius: 15px;
        padding: 10px;
        margin: 10px;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.04),
          /* 오른쪽, 아래쪽 그림자 */ -10px -10px 15px rgba(0, 0, 0, 0.04); /* 위쪽, 왼쪽 그림자 */
      }
      .mypage-myinfo-first {
        display: grid;
        grid-template-rows: 3fr 1fr;
      }
      .mypage-myinfo-first-detail {
        display: grid;
        grid-template-columns: 1.5fr 2fr 0.5fr;
        gap: 3px;
        height: 100%;
      }
      .mypage-myinfo-img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10%;
      }
      .mypage-myinfo-img {
        width: 100%;
        height: 80%;
        object-fit: cover;
      }
      .mypage-myinfo-nickname-container {
        margin-top: 26%;
        margin-left: 15%;
      }
      .mypage-myinfo-nickname {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        /* margin-top: 21%;
        margin-left: -25%; */
      }
      .mypage-myinfo-modify-button {
        display: flex; /* 이미지를 중앙에 배치하기 위해 flex를 사용 */
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
      }
      .mypage-myinfo-logout {
        color: #ca8ca6;
        font-size: 13px;
        font-weight: lighter;
        text-align: center;
        margin-top: 4%;
      }
      .mypage-myinfo-second {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 30px;
        text-align: center;
      }
      .mypage-myinfo-body {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        font-size: 20px;
      }
      .mypage-myinfo-univ {
        font-size: 20px;
        font-weight: bold;
      }
      .mypage-certify {
        font-size: 10px;
      }
      .mypage-myinfo-home {
        font-size: 20px;
        font-weight: bold;
      }
      .mypage-block {
        background-color: #f6f6f6;
        padding: 10px 0px 10px 0px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        margin-left: -10%;
        margin-right: -10%;
      }
      .mypage-container-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      
      .coin-container {
        display: grid;
        grid-template-columns: 1.3fr 1.7fr 1fr;
        justify-items: center; /* 수평 중앙 정렬 */
        align-items: center; /* 수직 중앙 정렬 */
        padding: 0px 15px 15px 15px;
        height: 40%;
        margin: 0px 10px 0px 10px;
        border-radius: 10px;
        background-color: #fff279;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        font-size: 18px;
        font-weight: bold;
      }
      .emoji-container {
        width: 150px;
        height: 150px;
        margin: 15px 10px 0px 15px;
        background-color: blanchedalmond;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }
      .emoji-grid-container {
        display: grid;
        grid-template-rows: 1fr 2fr 1fr;
        gap: 10px;
      }
      .emojies {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5px;
      }
      .mypage-charge-button {
        font-size: 11px;
        background-color: rgb(42, 40, 40);
        color: white;
        border-radius: 13px;
        width: 70px;
        height: 25px;
      }
      .mypage-friends-manage {
        width: 110%;
        height: 110%;
        object-fit: cover;
      }
      .mypage-image-container {
        width: 100%; /* 혹은 필요한 특정 크기 */
        height: auto; /* 높이를 자동으로 설정하여 비율을 유지 */
        display: flex; /* 이미지를 중앙에 배치하기 위해 flex를 사용 */
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
        overflow: hidden; /* 컨테이너 바깥으로 넘어가는 이미지 숨기기 */
      }
      
      .mypage-modify-arrow {
        margin-top: 10%;
        margin-left: 5%;
      }
      