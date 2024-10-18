import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function ImageTemplate() {
  const navigate = useNavigate();

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

  const [activePage, setActivePage] = useState('로고');
  const [senderNumber, setSenderNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSenderNumberChange = (e) => setSenderNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendClick = () => {
    console.log("발신 번호:", senderNumber);
    console.log("주소:", address);
    console.log("메시지:", message);
    navigate('/finish-send-message'); // 원하는 경로로 변경
  };

  const renderContent = () => {
    switch (activePage) {
      case '로고':
        return <div><h2>로고 삽입 화면입니다.</h2></div>;
      case 'QR 코드':
        return <div><h2>QR 코드 삽입 화면입니다.</h2></div>;
      case '텍스트':
        return <div><h2>텍스트 입력 화면입니다.</h2></div>;
      case '이미지':
        return <div><h2>이미지 삽입 화면입니다.</h2></div>;
      default:
        return null;
    }
  };

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

      <div style={styles.appContainer}>
        {/* 왼쪽 영역: 사이드바 추가 */}
        <div style={styles.leftContainer}>
          <Sidebar setActivePage={setActivePage} />
        </div>

        {/* renderContent를 왼쪽 영역 아래에 추가 */}
        <div style={styles.contentContainer}>
          {renderContent()} {/* 남은 공간에 내용 표시 */}
        </div>


        {/* 가운데 영역: 이미지 파일로 가득 채움 */}
        <div style={styles.centerContainer}>
          <img 
            src="https://cdn.insanmedicine.com/news/photo/202109/642_899_117.jpg" 
            alt="Center" 
            style={styles.centerImage} 
          />
        </div>

        {/* 오른쪽 발신자 정보 입력 영역 */}
        <div style={styles.rightContainer}>
          <h3>발신자 번호 입력</h3>
          <input 
            type="text" 
            value={senderNumber} 
            onChange={handleSenderNumberChange} 
            placeholder="010-0000-0000"
            style={styles.inputField} 
          />
          <button style={styles.button}>발신자 번호 등록</button>
          
          <h3>수신 주소록 선택</h3>
          <select value={address} onChange={handleAddressChange} style={styles.selectField}>
            <option value="">주소록</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
          </select>

          <h3>발송 메시지</h3>
          <textarea 
            value={message} 
            onChange={handleMessageChange} 
            placeholder="메시지를 입력하세요"
            style={styles.textarea}
            maxLength={2000}
          />
          <p>{message.length}/2000 byte</p>

          <div style={styles.buttonContainer}>
            <button style={styles.smallButton}>즉시 발송</button>
            <button style={styles.smallButton}>예약 발송</button>
            <button style={styles.smallButton}>테스트 발송</button>
          </div>

          <button onClick={handleSendClick} style={styles.sendButton}>발송하기</button>
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

// 사이드바 컴포넌트
function Sidebar({ setActivePage }) {
  const buttons = [
    { icon: '🏠', text: '로고' },
    { icon: '📷', text: 'QR 코드' },
    { icon: '✏️', text: '텍스트' },
    { icon: '🖼️', text: '이미지' }
  ];

  return (
    <div style={styles.sidebar}>
      {buttons.map((btn) => (
        <SidebarButton key={btn.text} icon={btn.icon} text={btn.text} onClick={() => setActivePage(btn.text)} />
      ))}
    </div>
  );
}

function SidebarButton({ icon, text, onClick }) {
  return (
    <button className="sidebar-button" onClick={onClick} style={styles.optionButton}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </button>
  );
}

// 모달 스타일
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



const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    padding: '20px',
  },
  leftContainer: {
    width: '15%', // 왼쪽 영역의 너비 조정 (좁게)
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    width: '20%', // renderContent를 위한 공간
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: '10px',
  },
  centerContainer: {
    width: '30%', // 가운데 영역의 너비
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: '90%', // 가운데 이미지를 가득 채우기
    height: 'auto',
  },
  rightContainer: {
    width: '35%', // 오른쪽 영역의 너비
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionButton: {
    width: '60%', // 버튼 너비를 80%로 설정 (좁게)
    marginBottom: '10px', // 버튼 간의 간격 추가
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center', // 버튼을 중앙에 정렬
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  selectField: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  smallButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '30%',
  },
  sendButton: {
    padding: '15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
  },
};




export default ImageTemplate;
