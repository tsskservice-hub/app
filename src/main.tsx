import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';

// 各ページコンポーネントのインポート
import OralExamQuestions from './pages/oral-exam-questions';
import GenkoyoshiEditor from './pages/genkoyoshi-editor';
import GamesIgo from './pages/game-igo';
import Prices from './pages/prices';
import EoyOralDrill from './pages/eoy-oral-drill';
import EoyOralElaborate from './pages/eoy-oral-elaborate';
import EoyOralMock from './pages/eoy-oral-mock';
import EoyWriting from './pages/eoy-writing';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* トップページ */}
        <Route path="/" element={<Home />} />
        
        {/* VCE Oral Exam 音声・AIチューターページ */}
        <Route path="/oral-exam" element={<OralExamQuestions />} />
        
        {/* Genkoyoshi Editor ページ */}
        <Route path="/editor" element={<GenkoyoshiEditor />} />

        {/* 囲碁ミニゲームページ */}
        <Route path="/game-igo" element={<GamesIgo />} />

        {/* 料金・プランページ */}
        <Route path="/prices" element={<Prices />} />

        {/* VCE Oral Exam 関連ページ */}
        <Route path="/vce/drill" element={<EoyOralDrill />} />
        <Route path="/vce/elaborate" element={<EoyOralElaborate />} />
        <Route path="/vce/mock-oral" element={<EoyOralMock />} />

        {/* VCE Written Exam 関連ページ */}
        <Route path="/vce/writing-tutor" element={<EoyWriting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);