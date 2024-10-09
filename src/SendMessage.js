import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import './App.css'; // CSS 파일 import


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

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setImageFile(null); // 파일 초기화
    setImageTitle(''); // 제목 초기화
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

        {/* 모달 창 */}
        {isModalOpen && (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
            <h2>이미지 생성</h2>
            <img
                src={'https://i.namu.wiki/i/rpLVfxepTgJITLsfXb1D4rc60K7e-QYWnCNbwI-_NUcTZ__vUSpcOygvmBV3IzWHOhY8xd-Kli4kOcr99EN1xg.svg'}
                alt="업로드된 이미지"
                style={{ width: '100%', height: 'auto' }}
            />
            <div>
                <input
                type="text"
                placeholder="이미지 제목 입력"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                />
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleFileUpload} />
            </div>
            <button onClick={applyImage}>이미지 적용하기</button>
            <button onClick={closeModal}>닫기</button>
            </div>
        </div>
        )}
    </div>
  );
}

// 모달 스타일
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '80%', // 너비 조정
};

export default SendMessage;
