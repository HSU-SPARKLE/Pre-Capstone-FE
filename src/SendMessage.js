import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

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
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [advertiseMessage, setAdvertiseMessage] = useState("기본 상태");

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

  const handleImageGeneration = async () => {
    setIsLoading(true); // 로딩 시작
  
    // 기본 이미지 배열
    const defaultImages = [
      { src: 'https://sparcleblobstorage.blob.core.windows.net/test-blob/uploaded_image_1732000775517.png', alt: 'Image 1' },
      { src: 'https://sparcleblobstorage.blob.core.windows.net/test-blob/uploaded_image_1732000776627.png', alt: 'Image 2' },
      { src: 'https://sparcleblobstorage.blob.core.windows.net/test-blob/uploaded_image_1732000776960.png', alt: 'Image 3' },
    ];
  
    try {
      // API 호출과 타임아웃 병렬 처리
      const generatedImages = await Promise.race([
        axios.post(`http://localhost:8080/api/message/generate/1`, {
          inputMessage: description,
          mood: category,
          season: season,
          keyWordMessage: [keyword],
        }).then((response) => {
          // 유효한 이미지 URL 확인
          if (Array.isArray(response.data.data.generatedImageUrls) && response.data.data.generatedImageUrls.length > 0) {
            // 광고 메시지를 상태에 저장
            setAdvertiseMessage(response.data.data.advertiseMessage || "메시지 전송");
            return response.data.data.generatedImageUrls.map((url, index) => ({
              src: url,
              alt: `Generated Image ${index + 1}`,
            }));
          }
          return defaultImages; // 이미지 URL이 없으면 기본 이미지 반환
        }),
        new Promise((resolve) => {
          setTimeout(() => resolve(defaultImages), 60000); // 60초 타임아웃 후 기본 이미지 반환
        }),
      ]);
  
      setSelectedImages(generatedImages); // 생성된 이미지 설정
      setShowRegenerateButton(true); // 재생성 버튼 표시
    } catch (error) {
      console.error('이미지 생성 중 오류 발생:', error);
      setSelectedImages(defaultImages); // 에러 발생 시 기본 이미지 설정
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  

  const handleImageRegeneration = async () => {
    setIsLoading(true); // 로딩 시작
    try {
        const response = await axios.post(`http://localhost:8080/api/message/generate/1`, {
            inputMessage: description,
            mood: category,
            season: season,
            keyWordMessage: [keyword],
        });

        const regeneratedImages = Array.isArray(response.data.data.generatedImageUrls) && response.data.data.generatedImageUrls.length > 0
            ? response.data.data.generatedImageUrls.map((url, index) => ({
                  src: url,
                  alt: `Generated Image ${index + 1}`,
              }))
            : [];

        setSelectedImages(regeneratedImages);
        setAdvertiseMessage(response.data.data.advertiseMessage || "기본 메시지를 설정하세요.");
    } catch (error) {
        console.error('이미지 생성 중 오류 발생:', error);
    } finally {
        setIsLoading(false); // 로딩 종료
    }
};

const handleImageClick = (image) => {
  navigate('/image-template', {
      state: {
          image: image.src, // 선택한 이미지 URL 전달
          message: advertiseMessage, // 광고 메시지 전달
      },
  });
};

  const handleMouseEnter = (index) => setHoveredImageIndex(index);
  const handleMouseLeave = () => setHoveredImageIndex(null);

  return (
    <div>
      <Navbar className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className='custom-text-black' href="/">SPARKLE</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/send-message">
              <Button className="custom-button nav-link-spacing">문자 보내기</Button>
            </Link>
            <Link to="/message-history">
              <Button className="custom-button nav-link-spacing">문자 내역 보기</Button>
            </Link>
            <Link to="/address-book-manage">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link> */}
          </Nav>
        </Container>
      </Navbar>

      <div style={styles.container}>
        <div style={styles.leftSection}>
        <h2 style={{ fontWeight: 'bold' }}>이미지 생성하기</h2>
          <div>
            <p>뿌리오 AI 기능을 통해 메세지를 입력하시면 총 3장의 AI 광고 이미지가 생성됩니다.</p>
            <p>이미지 재생성 버튼을 통해 새로운 이미지 생성이 가능합니다.</p>
            <p>생성된 이미지를 선택하여 템플릿 기능을 통해 자유롭게 디자인 수정이 가능합니다.</p>
          </div>
          <h3 style={{ fontWeight: 'bold' }}>발송 목적 및 내용</h3>
          <textarea
            style={styles.textArea}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="목적 및 내용을 입력하세요"
            maxLength={2000}
          />
          <div style={styles.charCount}>{description.length}/2000 byte</div>
          <div style={styles.keywordSection}>
            <h3 style={{ fontWeight: 'bold' }}>키워드 선택</h3>
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
              <h3 style={{ fontWeight: 'bold' }}>키워드 입력 (선택)</h3>
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="50% 할인, 피자"
                style={styles.input}
              />
            </div>
            <button
              onClick={handleImageGeneration}
              style={{
                ...styles.generateButton,
                backgroundColor: isLoading ? '#ccc' : '#007BFF', // 비활성화 상태 색상 변경
                cursor: isLoading ? 'not-allowed' : 'pointer', // 커서 변경
              }} 
              disabled={isLoading} // 로딩 중일 때 버튼 비활성화
            >
              이미지 생성하기
            </button>
          </div>
        </div>
        <div style={styles.rightSection}>
          <h2 style={{ fontWeight: 'bold' }}>이미지 생성 결과</h2>
          <div style={styles.imageGrid}>
            {isLoading ? ( // 로딩 중일 때 스피너 표시
              <div className="spinner" style={styles.spinner}></div>
            ) : (
              selectedImages.map((image, index) => (
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
              ))
            )}
          </div>
          {showRegenerateButton && !isLoading && ( // 로딩 중이 아닐 때만 재생성 버튼 표시
            <div style={styles.ButtonContainer}>
              <button 
                onClick={handleImageRegeneration} 
                style={{
                  ...styles.generateButton,
                  backgroundColor: isLoading ? '#ccc' : '#007BFF', // 비활성화 상태 색상 변경
                  cursor: isLoading ? 'not-allowed' : 'pointer', // 커서 변경
                }} 
                disabled={isLoading} // 로딩 중일 때 버튼 비활성화
              >
                이미지 재생성하기
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <button className="custom-floating-button floating-button" onClick={openModal}>
        {'<<'}
      </button> */}
      {/* <Modal 
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
      </Modal> */}
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
  ButtonContainer: {
    marginTop: '10px',
  },
  leftSection: {
    width: '40%',
    paddingRight: '20px',
    borderRight: '1px solid #ccc',
  },
  rightSection: {
    width: '60%',
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
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
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

