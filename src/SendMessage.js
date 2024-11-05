import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function SendMessage() {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState('차분한 분위기');
  const [season, setSeason] = useState('봄');
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogin = () => {
    console.log('아이디:', username);
    console.log('비밀번호:', password);
    closeModal();
  };

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSeasonChange = (e) => setSeason(e.target.value);

  let userId = 1;
  const handleImageGeneration = () => {
    // AI 이미지 생성 기능 호출 예시
    const newImages = [
      { src: 'https://cdn.insanmedicine.com/news/photo/202109/642_899_117.jpg', alt: 'Image 1' },
      { src: 'https://img.animalplanet.co.kr/news/2023/07/26/700/yksc1o84507zi4691o1s.jpg', alt: 'Image 2' },
      { src: 'https://i.namu.wiki/i/FTDAkOuqh6VP_iOGtJfHLHTf7jCIOhQ6LdU0Q_Y4TB3WvtIt1RBjKJfBVwAyUD6O0QVzdKlK5vXkGkMgexoPBBAirY-QAfJwb6BiqqbKOd4BmxPpM57OgjJxNa8CxJiAOsCOkVv7RIOhdA-8CYC8WA.webp', alt: 'Image 3' },
    ];
    setSelectedImages(newImages);
    setShowRegenerateButton(true); // 이미지 생성 후 재생성 버튼 표시
  };

  const handleImageRegeneration = () => {
    // 이미지 재생성 로직을 추가합니다.
    const regeneratedImages = [
      { src: 'https://blog.kakaocdn.net/dn/bvd1NP/btsFoctUnjD/spbSoDckKZTJno66EaDdCk/img.png', alt: 'New Image 1' },
      { src: 'https://m.candlemano.com/web/product/big/202208/3f87090a39761a6d5ad10d09ff953e60.jpg', alt: 'New Image 2' },
      { src: 'https://image.made-in-china.com/202f0j00aLlRpTervWqA/Colorful-Duck-Series-Bath-Duck-Toy-Floating-Duck-Baby-Bath-Duck-Kid-Duck.webp', alt: 'New Image 3' },
    ];
    setSelectedImages(regeneratedImages);
  };
  
  const handleImageClick = (image) => {
    console.log('클릭된 이미지:', image.alt);
    navigate('/image-template', { state: { image: image.src } }); // 클릭한 이미지의 URL 전달
  };
  
  
  const handleMouseEnter = (index) => setHoveredImageIndex(index);
  const handleMouseLeave = () => setHoveredImageIndex(null);

  return (
    <div>
      <Navbar className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className='custom-text-black' href="/">SPARKLE</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/send-message">
              <Button className="custom-button nav-link-spacing">문자 보내기</Button>
            </Link>
            <Link to="/message-history">
              <Button className="custom-button nav-link-spacing">문자 내역 보기</Button>
            </Link>
            <Link to="/address-book-manage">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={styles.container}>
        <div style={styles.leftSection}>
          <div>
            <p>뿌리오 AI 기능을 통해 메세지를 입력하시면 총 3장의 AI 광고 이미지가 생성됩니다.</p>
            <p>이미지 재생성 버튼을 통해 새로운 이미지 생성이 가능합니다.</p>
            <p>생성된 이미지를 선택하여 템플릿 기능을 통해 자유롭게 디자인 수정이 가능합니다.</p>
          </div>
          <h2>발송 목적 및 내용</h2>
          <textarea
            style={styles.textArea}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="목적 및 내용을 입력하세요"
            maxLength={2000}
          />
          <div style={styles.charCount}>{description.length}/2000 byte</div>
          <div style={styles.keywordSection}>
            <h2>키워드 선택</h2>
            <div style={styles.dropdownContainer}>
              <select value={category} onChange={handleCategoryChange} style={styles.select}>
                <option value="차분한 분위기">차분한 분위기</option>
                <option value="활기찬 분위기">활기찬 분위기</option>
                <option value="따뜻한 느낌">따뜻한 느낌</option>
              </select>
              <select value={season} onChange={handleSeasonChange} style={styles.select}>
                <option value="봄">봄</option>
                <option value="여름">여름</option>
                <option value="가을">가을</option>
                <option value="겨울">겨울</option>
              </select>
            </div>
            <div>
              <h3>키워드 입력 (선택)</h3>
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="50% 할인, 피자"
                style={styles.input}
              />
            </div>
            <button onClick={handleImageGeneration} style={styles.generateButton}>
              이미지 생성하기
            </button>
          </div>
        </div>
        <div style={styles.rightSection}>
          <h2>이미지 생성 결과</h2>
          <div style={styles.imageGrid}>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                style={{
                  ...styles.generatedImage,
                  border: hoveredImageIndex === index ? '3px solid #007BFF' : '1px solid #ccc',
                }}
                onClick={() => handleImageClick(image)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
          {showRegenerateButton && (
            <button onClick={handleImageRegeneration} style={styles.generateButton}>
              이미지 재생성하기
            </button>
          )}
        </div>
      </div>
      <button className="custom-floating-button floating-button" onClick={openModal}>
        {'<<'}
      </button>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        className="custom-modal"
        overlayClassName="Overlay"
        style={modalStyle}
      >
        <button className="custom-close-button close-button" onClick={closeModal} style={{ marginBottom: '20px' }}>
          {'>>'}
        </button>
        <h2>로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="custom-login-button" onClick={handleLogin}>
          로그인
        </button>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  leftSection: {
    width: '45%',
    paddingRight: '20px',
    borderRight: '1px solid #ccc',
  },
  rightSection: {
    width: '50%',
    paddingLeft: '20px',
  },
  textArea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  charCount: {
    textAlign: 'right',
    color: '#555',
  },
  keywordSection: {
    marginTop: '20px',
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  select: {
    width: '48%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  generateButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imageGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  generatedImage: {
    width: '30%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  regenerateButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const modalStyle = {
  content: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '30%',
    height: '100%',
    margin: '0',
    padding: '20px',
    opacity: 1,
    backgroundColor: 'white',
    overflowY: 'auto',
    zIndex: 1001,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
};

export default SendMessage;
