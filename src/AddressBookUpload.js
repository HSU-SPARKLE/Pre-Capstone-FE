import React, { useState } from 'react';
import './App.css'; // 필요한 CSS 파일

const ActionButtons: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 가시성 상태 관리

  const handleMouseEnter = () => {
    setDropdownVisible(true); // 마우스가 버튼 위에 있을 때 드롭다운 표시
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false); // 마우스가 버튼을 떠날 때 드롭다운 숨김
  };

  return (
    <section className="flex flex-col items-start">
      <div 
        className="dropdown"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <button className="dropdown-toggle z-10 px-16 py-4 mt-0 ml-14 max-w-full text-3xl leading-none text-center text-white bg-blue-600 rounded-xl border border-blue-600 border-solid">
          주소록 관리
        </button>
        {dropdownVisible && (
          <div className="dropdown-content z-10 flex flex-col mt-2 ml-14 text-center bg-white border border-blue-600 rounded-lg shadow-lg">
            <button className="px-4 py-2 text-xl leading-none text-blue-600 hover:bg-blue-600 hover:text-white">
              주소록 파일 업로드
            </button>
            <button className="px-4 py-2 text-xl leading-none text-blue-600 hover:bg-blue-600 hover:text-white">
              주소록 직접 업로드
            </button>
            <button className="px-4 py-2 text-xl leading-none text-blue-600 hover:bg-blue-600 hover:text-white">
              나의 주소록
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>SPARKLE</h1>
        <nav>
          <button>문자 보내기</button>
          <button>문자 내역 보기</button>
          {/* ActionButtons 컴포넌트로 드롭다운 메뉴 관리 */}
          <ActionButtons />
        </nav>
      </header>
      
      <div className="main-content">
        <section className="upload-section">
          <h2>주소록 파일 업로드</h2>
          <ul>
            <li>주소록 파일 형식은 .csv와 .xlsx만 가능합니다.</li>
            <li>전화번호 형식 이름은 '학원전화'로 입력하시면 가능합니다.</li>
            <li>전화번호 형식은 '010-1234-0589' 형식을 지켜주세요.</li>
          </ul>
          <button className="file-upload-btn">내 주소록 불러오기 <span>📂</span></button>
        </section>
        
        <section className="address-input-section">
          <h2>주소록 별칭 입력</h2>
          <input type="text" placeholder="별칭 입력" />
          <button>업로드</button>
        </section>
      </div>
      
      <div className="chat-button">💬</div>
    </div>
  );
};

export default App;
