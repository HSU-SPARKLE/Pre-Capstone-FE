import React from 'react';
import { Link } from 'react-router-dom';

function CreateImage() {
  return (
    <div>
      <h1>이미지 생성 화면</h1>
      <Link to="/send-message">
        <button>뒤로가기</button>
      </Link>
    </div>
  );
}

export default CreateImage;
