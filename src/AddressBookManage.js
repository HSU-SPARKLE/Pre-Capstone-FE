import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import Modal from 'react-modal'; // Modal 컴포넌트 import
import './App.css'; // CSS 파일 import

Modal.setAppElement('#root'); // 접근성 설정 (root ID를 가진 요소를 지정)

function AddressBookManage() {

  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSearch = () => {
    alert(`검색어: ${searchQuery}`);
    // 검색 기능 로직을 여기에 추가할 수 있습니다.
  };

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
            <Link to="/address-book-manage">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ margin: '100px' }}></div>

 <div style={styles.container}>
      <div style={styles.searchBar}>
        <select style={styles.dropdown}>
          <option>제목 + 내용</option>
          <option>제목</option>
          <option>내용</option>
        </select>
        <input
          type="text"
          placeholder="제목 또는 내용을 입력하세요"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <button onClick={handleClearSearch} style={styles.clearButton}>✕</button>
        <button onClick={handleSearch} style={styles.searchButton}>🔍</button>
      </div>
      <hr style={styles.divider} />

      <div style={{ margin: '100px' }}></div>

      <div style={styles.message}>
        발송내역이 없습니다
      </div>

      <div style={{ margin: '100px' }}></div>

      <hr style={styles.divider} />
      <div style={styles.pagination}>
        <button style={styles.pageNumber}>1</button>
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
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  dropdown: {
    padding: '5px',
    fontSize: '14px',
    marginRight: '5px'
  },
  input: {
    width: '300px',
    padding: '8px',
    fontSize: '14px',
    marginRight: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  clearButton: {
    padding: '8px',
    fontSize: '14px',
    marginRight: '5px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  searchButton: {
    padding: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  divider: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  message: {
    fontSize: '18px',
    color: '#333'
  },
  pagination: {
    marginTop: '20px'
  },
  pageNumber: {
    fontSize: '16px',
    padding: '5px 10px',
    color: '#007BFF',
    border: '1px solid #007BFF',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'transparent'
  }
};


export default AddressBookManage;
