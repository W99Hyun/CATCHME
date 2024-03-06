import React, { useEffect } from "react";
import styled from "styled-components";
import RoomBody from "../component/RoomBody";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BackgroundImage = styled.div`

  background-image: url(${process.env.PUBLIC_URL}/image/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  @media screen and (min-width: 320px) and (max-width: 1439px) {
    background-size: cover;
  }

`;

function Room() {
  const { roomId } = useParams(); // URL로부터 roomId를 가져옴
  /*const [csrftoken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://api.catchmenow.co.kr/main/csrf');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token', error);
      }
    };

    fetchCsrfToken();
  }, []); // 최초 렌더링 시에만 CSRF 토큰을 가져오도록 함
  */

  const accessToken = localStorage.getItem('accessToken');
  console.log('1. Access Token:', accessToken);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    //const refreshToken = localStorage.getItem('refreshToken');

    console.log('2. Access Token:', accessToken);

     const headers = {
      //'X-CSRFToken': csrftoken,
      'Authorization': `Bearer ${accessToken}`, 
      //'Refresh-Token': refreshToken,
    };

    // 서버로 정보 전송
    axios.get(`https://api.catchmenow.co.kr/main/api/jwttokentest/`, { headers })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [roomId]);

  return (
        <div>
          <BackgroundImage />
          <RoomBody roomId={roomId} />
        </div>
  );
}

export default Room;
