import React, { useState } from 'react';
import './ImageGenerator.css';

const MessageHistory = () => {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const generateImage = async () => {
    // 서버로부터 이미지를 가져오는 API 호출 예시 (API 엔드포인트는 수정 필요)
    const response = await fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, keyword }),
    });

    const data = await response.json();
    setImages(data.images);
  };

  return (
    <div className="container">
      <h2>Image Generator</h2>
      <div className="form-group">
        <label>발송 목적 및 내용</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="내용을 입력하세요."
          maxLength="2000"
          rows="4"
        ></textarea>
      </div>
      <div className="form-group">
        <label>키워드 (선택)</label>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="예: 50% 할인, 휴가"
        />
      </div>
      <button onClick={generateImage}>이미지 생성하기</button>

      <div className="image-result">
        <h3>이미지 생성 결과</h3>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={image.url} alt={`Generated ${index + 1}`} />

          ))}
        </div>
      </div>
    </div>
  );
};
export default MessageHistory;
