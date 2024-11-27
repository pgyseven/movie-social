import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage'; // 메인 페이지 컴포넌트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 메인 페이지 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;
