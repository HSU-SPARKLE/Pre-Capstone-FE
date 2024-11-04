import React from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <div>
      <h1>마이 페이지</h1>
      <Link to="/">
        <button>홈 화면으로 이동</button>
      </Link>
    </div>
  );
}

export default MyPage;
