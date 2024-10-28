import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import Modal from 'react-modal'; // Modal 컴포넌트 import
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './App.css'; // CSS 파일 import

function FinishSendMessage() {
  return (
    <div>
      <MainContent />
    </div>
  );
}

function MainContent() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogin = () => {
    console.log('아이디:', username);
    console.log('비밀번호:', password);
    closeModal();
  };

  return (
    <div>
      <Navbar className="custom-navbar" style={styles.navbar}>
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
      </Navbar>

      <div style={styles.mainContent}>
        <div style={styles.promoMessage}>
          <h2>문자 발송이 완료되었습니다!</h2>
        </div>
        <div style={styles.promoAd}>
          <div style={styles.imageSection}>
            <img src="https://cdn.insanmedicine.com/news/photo/202109/642_899_117.jpg" alt="Promo" style={styles.promoImage} />
          </div>
          <div style={styles.promoDetails}>
            <ul>
              <li style={styles.promoDetailItem}>발송일자: 2024-10-07</li>
              <li style={styles.promoDetailItem}>발신번호: 010-1234-5678</li>
              <li style={styles.promoDetailItem}>주소록 별칭: 한성대학교 대상 주소록</li>
            </ul>
          </div>
        </div>

        {/* 플로팅 버튼: 화면 상단으로 이동 */}
        <button className="custom-floating-button floating-button" onClick={openModal}>
          {'<<'}
        </button>

        {/* 로그인 모달 */}
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          className="custom-modal" // 애니메이션 클래스 추가
          overlayClassName="Overlay" // 오버레이 클래스 추가
          style={modalStyle} // 모달 스타일 적용
        >
          {/* 모달 닫기 버튼 추가 */}
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
    </div>
  );
}

// 모달 스타일
const modalStyle = {
  content: {
    top: '0', // 상단 정렬
    right: '0', // 오른쪽 정렬
    bottom: '0', // 하단 정렬
    left: '0', // 왼쪽 정렬
    width: '30%', // 가로 길이를 30%로 설정
    height: '100%', // 세로 길이를 100%로 설정
    margin: '0', // 마진 제거
    padding: '20px', // 적절한 패딩 추가
    opacity: 1, // 불투명도 설정
    backgroundColor: 'white', // 원하는 배경 색으로 변경
    overflowY: 'auto', // 내용이 넘칠 경우 스크롤 가능하도록 설정
    zIndex: 1001, // 오버레이보다 위에 표시되도록 설정
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
};

const styles = {
  navbar: {
    width: '100%', // 가로 전체 사용
    position: 'fixed', // 고정 위치
    top: 0, // 상단에 위치
    left: 0, // 왼쪽에 위치
    zIndex: 1000, // 다른 요소보다 위에 표시
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    marginTop: '60px', // Navbar 높이 만큼 여백 추가
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 가로 중앙 정렬
    justifyContent: 'center', // 세로 중앙 정렬

  },
  promoMessage: {
    color: '#3366cc',
    marginBottom: '20px',
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  promoAd: {
    display: 'flex',
    border: '1px solid #3366cc',
    padding: '20px',
    borderRadius: '10px',
    justifyContent: 'center', // 중앙 정렬
    alignItems: 'center', // 세로 중앙 정렬
  },
  imageSection: {
    marginRight: '20px',
  },
  promoImage: {
    width: '300px',
    height: 'auto',
  },
  promoDetails: {
    listStyleType: 'none',
    padding: 0,
  },
  promoDetailItem: {
    marginBottom: '10px',
  },
};

export default FinishSendMessage;
