import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';
import OralExamQuestions from './pages/oral-exam-questions'; // 📌 先ほど作成したページコンポーネントのパスに合わせて指定してください
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* トップページ */}
        <Route path="/" element={<Home />} />
        
        {/* VCE Oral Exam 音声・AIチューターページ */}
        <Route path="/oral-exam" element={<OralExamQuestions />} />
        
        {/* 今後追加するページはここにルーティングを追加していきます */}
        {/* <Route path="/kanji-quiz" element={<KanjiQuiz />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);