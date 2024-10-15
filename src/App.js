import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // 필요한 CSS 스타일링 파일
import AddressBookUpload from './AddressBookUpload'; // 주소록 파일 업로드 컴포넌트

const Home = () => {
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [generatedImages, setGeneratedImages] = useState([
    { id: 1, src: 'sale_image_url', alt: '방학만이 SALE' },
    { id: 2, src: 'festival_image_url', alt: '2024 콜로 루트 축제' },
    { id: 3, src: 'sale50_image_url', alt: '범우주적 특가 50%' }
  ]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleGenerateImages = () => {
    console.log("이미지 생성 중...");
  };

  const handleImageClick = (image) => {
    console.log("선택한 이미지: ", image);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>SPARKLE</h1>
        <nav>
          <Link to="/"><button>문자 보내기</button></Link>
          <Link to="/history"><button>문자 내역 보기</button></Link>
          <Link to="/upload"><button>주소록 관리</button></Link>
        </nav>
      </header>

      <main className="main-content">
        <section className="step step1">
          <h2>step 1.</h2>
          <p>문자 발송 목적 및 내용과 키워드(선택)를 입력한 뒤 이미지 생성 버튼을 클릭합니다.</p>
          <textarea 
            placeholder="발송 목적 및 내용"
            value={message}
            onChange={handleMessageChange}
            maxLength={2000}
            rows={6}
          />
          <input 
            type="text"
            placeholder="키워드 (선택)"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button onClick={handleGenerateImages}>이미지 생성하기</button>
        </section>

        <section className="step step2">
          <h2>step 2.</h2>
          <p>생성된 3장의 이미지 중 발송할 이미지를 클릭합니다.</p>
          <div className="generated-images">
            {generatedImages.map((image) => (
              <img 
                key={image.id} 
                src={image.src} 
                alt={image.alt} 
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 홈 화면 */}
        <Route path="/upload" element={<AddressBookUpload />} /> {/* 주소록 파일 업로드 화면 */}
      </Routes>
    </Router>
  );
};

export default App;
