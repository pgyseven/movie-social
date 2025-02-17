import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage'; // 메인 페이지 컴포넌트
import MeetingListPage from './pages/MeetingListPage'; // 모임 리스트 페이지 컴포넌트
import MeetingDetailPage from './pages/MeetingDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/meetings" element={<MeetingListPage />} />
        <Route path="/meetings/:meetingId" element={<MeetingDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
