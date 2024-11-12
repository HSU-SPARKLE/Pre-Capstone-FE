import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function Home() {
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
      <Navbar className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className='custom-text-black' href="/">SPARKLE</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/send-message">
              <button style={styles.customButton}>문자 보내기</button>
            </Link>
            <Link to="/message-history">
              <button style={styles.customButton}>문자 내역 보기</button>
            </Link>
            <Link to="/address-book-manage">
              <button style={styles.customButton}>주소록 관리</button>
            </Link>
          </Nav>
        </Container>
      </Navbar>



      <div style={styles.container}>
      <br />
      <h1>SPARKLE</h1>
      <Link to="/send-message">
        <button style={styles.customButton}>문자 보내기 화면으로 이동</button>
      </Link>
      <Link to="/AI-chatbot">
        <button style={styles.customButton}>AI ChatBot 화면으로 이동</button>
      </Link>
      <Link to="/message-history">
        <button style={styles.customButton}>문자 내역 화면으로 이동</button>
      </Link>
      <Link to="/mypage">
        <button style={styles.customButton}>마이 페이지로 이동</button>
      </Link>

      <button style={styles.customFloatingButton} onClick={openModal}>
        {'<<'}
      </button>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        className="custom-modal"
        overlayClassName="Overlay"
        style={modalStyle}
      >
        <button style={styles.customCloseButton} onClick={closeModal}>
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
        <button style={styles.customLoginButton} onClick={handleLogin}>
          로그인
        </button>
      </Modal>
    </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  customButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '5px',
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
