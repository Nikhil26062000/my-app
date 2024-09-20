

import React, { useContext, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SessionProvider } from './components/SessionContext';
import HomePage from "./pages/homepage";
import BriefSummary from "./pages/BriefSummary";
import DetailedSummary from "./pages/DetailedSummary";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Address from '../src/pages/myAddress/Address';
import QR from './components/QR.js';
import Turn_Off from './pages/Notifications/Turn_Off.js';
import Turn_On from './pages/Notifications/Turn_On.js';
import Language from './pages/Language_Page/Language.js';
import Password from './pages/Password/Password.js';
import Default_Address from './pages/myAddress/Default_Address.js';
import Account from './pages/Account/Account.js';
import Dashboard from './pages/HomePageDashboard/Dashboard.js';
import CitizenScientistKit from './pages/CitizenScientistKit/CitizenScientistKit.js';
import Discussion from './pages/CitizenScientistKit/Discussion.js';
import Posts from './pages/CitizenScientistKit/Posts.js';
import MediaCapture from './pages/CitizenScientistKit/MediaCapture.js';
import ResetPassword from './pages/ResetPassword/ResetPassword.js';
import ScannedQrDetailPage from "./components/ScannedQrDetailPage.js";
import { MyContext } from "./context/accountProvider.js";
import Landing from "./pages/LandingPage/Landing.js";
import RecordView from "./pages/CitizenScientistKit/Video/Recordview.js";
import AudioRecorder from "./pages/CitizenScientistKit/Audio/Audio.jsx";
import CommentsPage from "./pages/Comments/CommentsPage.jsx";
import Post_Page_Admin from './pages/AdminPannel/Post_Page_Admin.js'
import Admin_Privilege from "./pages/AdminPannel/Admin_Privilege.js";

function App() {
  const {token} = useContext(MyContext)
 
  // console.log = function () { }
  
  
  return (
    <SessionProvider>
      <Router>
        <Routes>
        {/* Non-protected routes */}
          <Route path="/signup" element={token ? <Navigate to="/" /> :<Signup/>} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/resetPassword" element={token ? <Navigate to="/" />: <ResetPassword/> }/>
          <Route path="/" element={token ? <Navigate to="/home" />: <Landing/> }/>
          
          
          {/* Protected routes */}
          <Route path="/home" element={token ? <HomePage/>:<Navigate to="/" />} />
          <Route path="/qrcode" element={token ? <QR /> : <Navigate to="/" />} />
          <Route path="/address" element={token ? <Address /> : <Navigate to="/" />} />
          <Route path="/notificationOn" element={token ? <Turn_Off /> : <Navigate to="/" />} />
          <Route path="/notificationOff" element={token ? <Turn_On /> : <Navigate to="/" />} />
          <Route path="/language" element={token ? <Language /> : <Navigate to="/" />} />
          <Route path="/managePassword" element={token ? <Password /> : <Navigate to="/" />} />
          <Route path="/defaultAddress" element={token ? <Default_Address /> : <Navigate to="/" />} />
          <Route path="/account" element={token ? <Account /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/kit" element={token ? <CitizenScientistKit /> : <Navigate to="/" />} />
          <Route path="/discussion" element={token ? <Discussion /> : <Navigate to="/" />} />
          <Route path="/posts" element={token ? <Posts /> : <Navigate to="/" />} />
          <Route path="/posts/:id" element={token ? <CommentsPage /> : <Navigate to="/" />} />
          <Route path="/posts/admin/edit" element={token ? <Post_Page_Admin /> : <Navigate to="/" />} />
          <Route path="/admin/privilege" element={token ? <Admin_Privilege /> : <Navigate to="/" />} />
         
          <Route path="/qrDetails/:id" element={token ? <ScannedQrDetailPage /> : <Navigate to="/" />} />
          <Route path="/camera" element={token ? <MediaCapture /> : <Navigate to="/" />} />
          {/* <Route path="/video" element={token ? <RecordView /> : <Navigate to="/" />} /> */}
          <Route path="/audio" element={token ? <AudioRecorder /> : <Navigate to="/" />} />
          <Route path="/region/:regionId" element={token ? <BriefSummary /> : <Navigate to="/" />} />
          <Route path="/region/:regionId/detailed" element={token ? <DetailedSummary /> : <Navigate to="/" />} />
          <Route path="/region/:regionId/itemlist" element={token ? <ItemList /> : <Navigate to="/" />} />
          <Route path="/item/:region_id/:species_id" element={token ? <ItemDetail /> : <Navigate to="/" />} />

          
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
