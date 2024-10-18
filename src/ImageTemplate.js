import React, { useState } from 'react';
import './App.css'; // CSS 파일 import

function ImageTemplate() {
  const [selectedOption, setSelectedOption] = useState('image'); // 기본 값은 '이미지'

  // 왼쪽 메뉴에서 클릭했을 때 실행될 함수
  const handleOptionClick = (option) => {
    setSelectedOption(option); // 클릭한 옵션으로 상태 업데이트
  };

  // 오른쪽 화면에 보여줄 콘텐츠를 렌더링하는 함수
  const renderContent = () => {
    switch (selectedOption) {
      case 'logo':
        return <div><h2>로고 삽입</h2></div>;
      case 'qr':
        return <div><h2>QR 코드 생성</h2></div>;
      case 'text':
        return <div><h2>텍스트 입력</h2></div>;
      case 'image':
        return (
          <div>
            <h2>이미지 삽입</h2>
            <p>생성된 이미지 기반의 추천 템플릿 이미지 입니다. 원하는 이미지를 선택하여 생성된 이미지에 부착할 수 있습니다.</p>
            {/* 예시 이미지 리스트 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <img src="https://cdn.insanmedicine.com/news/photo/202109/642_899_117.jpg" alt="이미지1" style={{ width: '100%' }} />
              <img src="https://img.animalplanet.co.kr/news/2023/07/26/700/yksc1o84507zi4691o1s.jpg" alt="이미지2" style={{ width: '100%' }} />
              <img src="https://i.namu.wiki/i/FTDAkOuqh6VP_iOGtJfHLHTf7jCIOhQ6LdU0Q_Y4TB3WvtIt1RBjKJfBVwAyUD6O0QVzdKlK5vXkGkMgexoPBBAirY-QAfJwb6BiqqbKOd4BmxPpM57OgjJxNa8CxJiAOsCOkVv7RIOhdA-8CYC8WA.webp" alt="이미지3" style={{ width: '100%' }} />
              <img src="https://blog.kakaocdn.net/dn/bvd1NP/btsFoctUnjD/spbSoDckKZTJno66EaDdCk/img.png" alt="이미지4" style={{ width: '100%' }} />
              <img src="https://m.candlemano.com/web/product/big/202208/3f87090a39761a6d5ad10d09ff953e60.jpg" alt="이미지5" style={{ width: '100%' }} />
              <img src="https://image.made-in-china.com/202f0j00aLlRpTervWqA/Colorful-Duck-Series-Bath-Duck-Toy-Floating-Duck-Baby-Bath-Duck-Kid-Duck.webp" alt="이미지6" style={{ width: '100%' }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* 왼쪽 사이드바 */}
      <div style={styles.sidebar}>
        <div style={styles.menuItem} onClick={() => handleOptionClick('logo')}>로고</div>
        <div style={styles.menuItem} onClick={() => handleOptionClick('qr')}>QR 코드</div>
        <div style={styles.menuItem} onClick={() => handleOptionClick('text')}>텍스트</div>
        <div style={styles.menuItem} onClick={() => handleOptionClick('image')}>이미지</div>
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '20px',
  },
  menuItem: {
    padding: '15px 10px',
    marginBottom: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    width: '80%',
    padding: '20px',
  },
};

export default ImageTemplate;
