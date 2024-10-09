import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import './App.css'; // CSS 파일 import

function Home() {
  return (
    <div>
      <Navbar className="custom-navbar">
        <Container fluid> {/* fluid로 변경 */}
          <Navbar.Brand className='custom-text-black' href="/">SPARKLE</Navbar.Brand>
          <Nav className="me-auto"> {/* me-auto 제거 */}
            <Link to="/send-message">
              <Button className="custom-button nav-link-spacing">문자 보내기</Button>
            </Link>
            <Link to="/message-history">
              <Button className="custom-button nav-link-spacing">문자 내역 보기</Button>
            </Link>
            <Link to="#pricing">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <h1>홈 화면</h1>
      <Link to="/send-message">
        <button>문자 보내기 화면으로 이동</button>
      </Link>
      <Link to="/AI-chatbot">
        <button>AI ChatBot 화면으로 이동</button>
      </Link>
      <Link to="/message-history">
        <button>문자 내역 화면으로 이동</button>
      </Link>
      <Link to="/mypage">
        <button>마이 페이지로 이동</button>
      </Link>
    </div>
  );
}

export default Home;
