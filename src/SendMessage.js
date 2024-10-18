import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import Modal from 'react-modal'; // Modal 컴포넌트 import
import './App.css'; // CSS 파일 import


function SendMessage() {
  const [contacts, setContacts] = useState(['']); // 연락처 배열
  const [kakaoIds, setKakaoIds] = useState(['']); // 카카오톡 ID 배열
  const [category, setCategory] = useState(''); // 카테고리 상태
  const [message, setMessage] = useState(''); // 메시지 상태
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
            <Link to="/address-book-manage">
              <Button className="custom-button nav-link-spacing">주소록 관리</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <br />


        {/* 전화번호부 파일 업로드 */}
        <div>
        <label>전화번호부 파일 업로드 (엑셀 파일 등): </label>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>

        {/* 여러 전화번호 입력 필드 */}
        <div>
        {contacts.map((contact, index) => (
            <div key={index}>
            <input
                type="text"
                placeholder="전화번호 입력"
                value={contact}
                onChange={(e) => handleContactChange(index, e.target.value)}
            />
            </div>
        ))}
        <button onClick={handleAddContact}>연락처 추가</button>
        </div>

        {/* 여러 카카오톡 ID 입력 필드 */}
        <div>
        {kakaoIds.map((kakaoId, index) => (
            <div key={index}>
            <input
                type="text"
                placeholder="카카오톡 ID 입력"
                value={kakaoId}
                onChange={(e) => handleKakaoIdChange(index, e.target.value)}
            />
            </div>
        ))}
        <button onClick={handleAddKakaoId}>카카오톡 ID 추가</button>
        </div>

        {/* 카테고리 설정 */}
        <div>
        <p>문자를 보내는 곳의 카테고리를 선택하세요:</p>
        <label>
            <input
            type="radio"
            value="식당"
            checked={category === '식당'}
            onChange={(e) => setCategory(e.target.value)}
            />
            식당
        </label>
        <label>
            <input
            type="radio"
            value="옷가게"
            checked={category === '옷가게'}
            onChange={(e) => setCategory(e.target.value)}
            />
            옷가게
        </label>
        <label>
            <input
            type="radio"
            value="마트"
            checked={category === '마트'}
            onChange={(e) => setCategory(e.target.value)}
            />
            마트
        </label>
        </div>

        {/* 메시지 입력 필드 */}
        <div>
        <textarea
            placeholder="보낼 메시지 입력"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        </div>

        {/* 이미지 생성 버튼 */}
        <button onClick={handleSendMessage}>이미지 생성</button>

        {/* 씨앗 정보 표시 */}
        <div style={{ marginTop: '10px' }}>
            <p>문자 송신에 필요한 씨앗: {seedsNeeded}개</p>
            <p>현재 보유한 씨앗: {userSeeds}개</p>
        </div>

        {/* 문자 보내기 버튼 */}
        <button onClick={sendMessage}>문자 보내기</button>

        <Link to="/">
        <button>홈 화면으로 이동</button>
        </Link>




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

export default SendMessage;
