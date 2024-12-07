import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-modal';
import backgroundImage from './images/sparkle.jpg'; // 이미지 파일 import
import './App.css';

Modal.setAppElement('#root');

function Home() {
  const [isHovered, setIsHovered] = useState(false); // hover 상태 관리

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.overlay}></div> {/* 오버레이 추가 */}
        <br />
        <h1 style={{ fontSize: '70px', fontWeight: 'bold', color: 'white', zIndex: 2, position: 'relative' }}> AI 템플릿 메이커 : </h1>
        <h2 style={{ fontSize: '50px', fontWeight: 'bold', color: 'white', zIndex: 2, position: 'relative' }}> 이미지 템플릿 기능을 통한 커스텀 이미지 생성 후 발송하기 </h2>
        <Link to="/send-message">
          <button 
            style={isHovered ? styles.customButtonHovered : styles.customButton} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            시작하기!
          </button>
        </Link>
        <h3 style={{ fontWeight: '900', fontSize: '20px', marginTop: '450px', marginLeft: '1290px', color: 'white', zIndex: 2, position: 'relative' }}>SW프리캡스톤디자인[8] 4팀 스파클</h3>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`, // import한 이미지 사용
    backgroundSize: 'cover', // 배경 이미지 크기 설정
    backgroundPosition: 'center', // 배경 이미지 위치 설정
    height: '100vh', // 전체 높이를 화면 높이로 설정
    position: 'relative', // 오버레이를 위해 position 설정
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 검정색 반투명 오버레이
    zIndex: 1, // 텍스트보다 뒤에 있도록 설정
  },
  customButton: {
    width: '300px',
    height: '150px',
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '40px', // 버튼 모서리 둥글게
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s', // 배경색과 변형 효과 추가
    marginTop: '30px',
    fontSize: '50px',
    fontWeight: '850', // 텍스트 두께를 더 두껍게 설정
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    position: 'relative', // 버튼을 상대 위치로 설정하여 z-index 적용
    zIndex: 2, // 버튼을 오버레이 위에 위치하게 설정
  },
  customButtonHovered: {
    width: '300px',
    height: '150px',
    padding: '10px 20px',
    backgroundColor: 'white', // hover 시 배경색 변경
    color: 'black',
    border: 'none',
    borderRadius: '40px', // 버튼 모서리 둥글게
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    marginTop: '30px',
    fontSize: '50px',
    fontWeight: '850', // hover 시에도 텍스트 두께 유지
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    zIndex: 2,
    transform: 'scale(1.05)', // hover 시 약간 커지도록 설정
  },
  customFloatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 1)',
  },
  customCloseButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
  customLoginButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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

export default Home;
