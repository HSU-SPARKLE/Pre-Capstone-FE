import React from 'react';
import { Link } from 'react-router-dom';

function MessageHistory() {
  return (
    <div>
      <h1>문자 내역 화면</h1>
      <Link to="/">
        <button>홈 화면으로 이동</button>
      </Link>
    </div>
  );
}

export default MessageHistory;
