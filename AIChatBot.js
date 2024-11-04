import React from 'react';
import { Link } from 'react-router-dom';

function AIChatBot() {
  return (
    <div>
      <h1>AIChatBot 화면</h1>
      <Link to="/">
        <button>홈 화면으로 이동</button>
      </Link>
    </div>
  );
}

export default AIChatBot;
