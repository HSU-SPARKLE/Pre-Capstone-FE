import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import Modal from 'react-modal'; // Modal 컴포넌트 import
import './App.css'; // CSS 파일 import

Modal.setAppElement('#root'); // 접근성 설정 (root ID를 가진 요소를 지정)


function SendMessage() {
  const [contacts, setContacts] = useState(['']); // 연락처 배열
  const [kakaoIds, setKakaoIds] = useState(['']); // 카카오톡 ID 배열
  const [category, setCategory] = useState(''); // 카테고리 상태
  const [message, setMessage] = useState(''); // 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [imageFile, setImageFile] = useState(null); // 업로드된 이미지 파일
  const [imageTitle, setImageTitle] = useState(''); // 이미지 제목
  const [seedsNeeded, setSeedsNeeded] = useState(10); // 문자 송신에 필요한 씨앗
  const [userSeeds, setUserSeeds] = useState(15); // 현재 사용자가 보유한 씨앗

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

  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleGenerateImage = () => {
    alert('이미지 생성하기 버튼이 클릭되었습니다.');
    // 이미지 생성 로직을 여기에 추가
  };


  // 연락처 입력 필드 처리
  const handleContactChange = (index, value) => {
    const newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, '']); // 새로운 연락처 추가
  };

  // 카카오톡 ID 입력 필드 처리
  const handleKakaoIdChange = (index, value) => {
    const newKakaoIds = [...kakaoIds];
    newKakaoIds[index] = value;
    setKakaoIds(newKakaoIds);
  };

  const handleAddKakaoId = () => {
    setKakaoIds([...kakaoIds, '']); // 새로운 카카오톡 ID 추가
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('업로드된 파일:', file);
    setImageFile(file); // 이미지 파일 상태 업데이트
  };

  const handleSendMessage = () => {
    console.log('연락처:', contacts);
    console.log('카카오톡 ID:', kakaoIds);
    console.log('카테고리:', category);
    console.log('메시지:', message);
    setIsModalOpen(true); // 모달 열기
  };



  const applyImage = () => {
    // 이미지 적용하기 로직 추가 필요
    console.log('제목:', imageTitle);
    console.log('업로드된 이미지:', imageFile);
  };

  const sendMessage = () => {
    // 문자 보내기 로직 추가 필요
    console.log('문자 송신!');
    console.log('사용자 보유 씨앗:', userSeeds);
    console.log('필요한 씨앗:', seedsNeeded);
    if (userSeeds >= seedsNeeded) {
      console.log('문자 송신 완료!');
    } else {
      console.log('씨앗이 부족합니다.');
    }
    closeModal(); // 모달 닫기
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
            <Link to="#pricing">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <br />

      <div style={styles.container}>
      <p style={styles.instructions}>
        • 뿌리오 AI 기능을 통해 메시지를 입력하시면 총 3장의 AI 광고 이미지가 생성됩니다.<br />
        • 이미지 재생성 버튼을 통해 새로운 이미지 생성이 가능합니다.<br />
        • 생성된 이미지를 선택하여 템플릿 기능을 통해 자유롭게 디자인 수정이 가능합니다.
      </p>
      <div style={styles.textareaContainer}>
        <label htmlFor="content" style={styles.label}>발송 목적 및 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="ex: 한성대 피자집 가게에서 방문 포장 시 50% 할인을 진행합니다. 위 광고 문구를 결제 시 직원분께 보여주시면 됩니다. 일부 품목에 한해서 할인이 제한될 수 있습니다. 감사합니다."
          maxLength={2000}
          style={styles.textarea}
        />
        <div style={styles.byteCount}>{content.length}/2000 byte</div>
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="keywords" style={styles.label}>키워드 (선택)</label>
        <input
          id="keywords"
          value={keywords}
          onChange={handleKeywordsChange}
          placeholder="ex: 50% 할인, 피자"
          style={styles.input}
        />
      </div>
      <button onClick={handleGenerateImage} style={styles.button}>
        이미지 생성하기
      </button>
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

const modalContentStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0)',
  width: '70%', // 너비 조정
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  instructions: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#333'
  },
  textareaContainer: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px'
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  byteCount: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#666'
  },
  inputContainer: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default SendMessage;
