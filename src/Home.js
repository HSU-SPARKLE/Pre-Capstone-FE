// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>홈 화면</h1>
      <Link to="/send-message">
        <button>문자 보내기 화면으로 이동</button>
      </Link>
      <Link to="/AI-chatbot">
        <button>AI ChatBot 화면으로 이동</button>
      </Link>
      <Link to="/message-history">
        <button>문자 내역 화면으로 이동</button>
      </Link>
      <Link to="/mypage">
        <button>마이 페이지로 이동</button>
      </Link>
    </div>
  );
}

export default Home;
