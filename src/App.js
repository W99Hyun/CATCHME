import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import RoomHeader from "./page/RoomHeader";
import MeetingRoomMain from './page/MeetingRoomMain';
import Room from './page/Room';
import PayComplete from './page/PayCompletePage';
import Loading from "./page/LoadingPage";
import NotLogin from "./page/NotLoginPage";
import YesLogin from './page/YesLoginPage';
import MyPage from "./page/MyPage";
import Help from "./page/HelpPage";
import WithFriends from "./page/WithFriendsPage";
import Alarm from "./page/AlarmPage";
import MatchHistory from "./page/MatchHistoryPage";
import Information from './page/InformationPage';
import Welcome02 from './page/Welcome02';
import Welcome03 from './page/Welcome03';
import {GenderProvider} from './page/GenderContext';
import Welcome04 from './page/Welcome04';
import Welcome05 from './page/Welcome05';
import Welcome06 from './page/Welcome06';
import Welcome07 from './page/Welcome07';
import Welcome08 from './page/Welcome08';
import Welcome09 from './page/Welcome09';
import Welcome10 from './page/Welcome10';
import Welcome11 from './page/Welcome11';
import Welcome12 from './page/Welcome12';
import Welcome13M from './page/Welcome13M';
import Welcome13W from './page/Welcome13W';
import Welcome14 from './page/Welcome14';
import Welcome15 from './page/Welcome15';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RoomHeader/>
        <GenderProvider>
      <Routes> 
          <Route path="/" element={<Loading />} />
          <Route path="/notlogin" element={<NotLogin />} />
          <Route path="/login" element={<YesLogin />} />
          <Route path="/login/information" element={<Information />} />
          <Route path="/login/information/Welcome02" element={<Welcome02 />} />
          <Route path="/login/information/Welcome03" element={<Welcome03 />} />
          <Route path="/login/information/Welcome04" element={<Welcome04 />} /> 
          <Route path="/login/information/Welcome05" element={<Welcome05 />} /> 
          <Route path="/login/information/Welcome06" element={<Welcome06 />} /> 
          <Route path="/login/information/Welcome07" element={<Welcome07 />} /> 
          <Route path="/login/information/Welcome08" element={<Welcome08 />} /> 
          <Route path="/login/information/Welcome09" element={<Welcome09 />} /> 
          <Route path="/login/information/Welcome10" element={<Welcome10 />} /> 
          <Route path="/login/information/Welcome11" element={<Welcome11 />} /> 
          <Route path="/login/information/Welcome12" element={<Welcome12 />} />
          <Route path="/login/information/Welcome13M" element={<Welcome13M />} /> 
          <Route path="/login/information/Welcome13W" element={<Welcome13W />} /> 
          <Route path="/login/information/Welcome14" element={<Welcome14 />} /> 
          <Route path="/login/information/Welcome15" element={<Welcome15 />} /> 
          <Route path="/login/mypage" element={<MyPage />} />
          <Route path="/login/help" element={<Help />} />
          <Route path="/login/alarm" element={<Alarm />} />
          <Route path="/login/withfriends" element={<WithFriends />} />
          <Route path="/login/matchhistory" element={<MatchHistory />} />
          <Route path="/MeetingRoomMain" element={<MeetingRoomMain />} />
          <Route path="/room/:roomId" element={<Room />} /> 
          <Route path="/PayComplete" element={<PayComplete />} />
      </Routes>
      </GenderProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;