import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './AddressBookManage.css';

const ActionButtons = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div
      className="dropdown-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="dropdown-toggle">
        주소록 관리
      </button>
      {dropdownVisible && (
        <div className="dropdown-content">
          <Link to="/address-upload" className="dropdown-item">주소록 파일 업로드</Link>
          <Link to="/address-manual-upload" className="dropdown-item">주소록 직접 업로드</Link>
          <Link to="/my-address-book" className="dropdown-item">나의 주소록</Link>
        </div>
      )}
    </div>
  );
};

const AddressBookManage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleMyAddressBookClick = () => {
    navigate('/my-address-book');
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const openChatbot = () => {
    setShowChatbot(true);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      setMessage(""); // 입력란 비우기
      // 여기에서 챗봇 응답 로직을 추가할 수 있습니다.
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="brand">SPARKLE</Link>
        <nav className="nav-links">
          <Link to="/send-message" className="nav-button">문자 보내기</Link>
          <Link to="/message-history" className="nav-button">문자 내역 보기</Link>
          <ActionButtons />
        </nav>
      </header>
      
      <div className="main-content">
        <section className="upload-section">
          <h2>주소록 파일 업로드</h2>
          <ul>
            <li>주소록 파일 형식은 .csv와 .xlsx만 가능합니다.</li>
            <li>전화번호 컬럼 이름은 '휴대폰'으로 입력시에만 가능합니다.</li>
            <li>전화번호 형식은 '010-1234-0589' 형식을 지켜주세요.</li>
          </ul>
          <button className="file-upload-btn" onClick={handleMyAddressBookClick}>
            내 주소록 불러오기 <span role="img" aria-label="file">📂</span>
          </button>
        </section>
        
        <section className="address-input-section">
          <h2>주소록 별칭 입력</h2>
          <input type="text" placeholder="별칭 입력" className="input-text" />
          <button className="upload-btn" onClick={handleUploadButtonClick}>업로드</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </section>
      </div>
      
      <div className="chat-button" onClick={openChatbot}>💬</div>

      {/* 챗봇 모달 */}
      <Modal
        isOpen={showChatbot}
        onRequestClose={closeChatbot}
        className="chatbot-modal"
        overlayClassName="Overlay"
      >
        <button className="close-chatbot-button" onClick={closeChatbot}>X</button>
        <h2>챗봇</h2>
        <div className="chatbot-content">
          <div className="chat-history">
            {chatHistory.map((entry, index) => (
              <p key={index} className={entry.sender === "user" ? "user-message" : "bot-message"}>
                {entry.text}
              </p>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="chat-input-field"
            />
            <button onClick={handleSendMessage} className="send-button">전송</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddressBookManage;
