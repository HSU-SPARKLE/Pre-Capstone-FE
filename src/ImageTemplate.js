import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import './App.css';

const Sidebar = ({ setActivePage }) => {
  const buttons = ['로고', 'QR 코드', '텍스트', '이미지'];
  return (
    <div style={styles.sidebar}>
      {buttons.map((text) => (
        <button key={text} onClick={() => setActivePage(text)} style={styles.optionButton}>
          {text}
        </button>
      ))}
    </div>
  );
};

const ImageTemplate = () => {
  const location = useLocation();
  const [image, setImage] = useState(location.state?.image?.src || null);

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('로고');
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [fontSize, setFontSize] = useState('24');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const canvasRef = useRef(null);
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState(1);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;

  const addText = () => {
    if (currentText.trim()) {
      setTexts([
        ...texts,
        {
          text: currentText,
          x: textPosition.x,
          y: textPosition.y,
          fontSize: fontSize,
          fontFamily: fontFamily,
          color: textColor,
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          backgroundColor: backgroundColor,
        
          shadowColor: shadowColor,
          shadowBlur: shadowBlur,
          shadowOffsetX: shadowOffsetX,
          shadowOffsetY: shadowOffsetY,
        },
      ]);
      setCurrentText('');
      setTextPosition({ x: 50, y: 50 });
      setFontSize('24');
      setFontFamily('Arial');
      setTextColor('#000000');
      setFontWeight('normal');
      setFontStyle('normal');
      setBackgroundColor('');
    
      setShadowColor('transparent');
      setShadowBlur(0);
      setShadowOffsetX(0);
      setShadowOffsetY(0);
    }
  };
  
  


// 새로운 상태 추가
const [backgroundColor, setBackgroundColor] = useState(''); // 초기값을 빈 문자열로 설정하여 배경색 없음

const renderCanvasContent = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 배경 이미지 렌더링
  if (image) {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawTexts(ctx);  // 이미지 로드 후 기존 텍스트 렌더링
      drawLiveText(ctx);  // 실시간 텍스트 렌더링
    };
  } else {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawTexts(ctx);  // 이미지가 없을 때도 기존 텍스트 렌더링
  }

  drawLiveText(ctx);  // 항상 실시간 입력 중인 텍스트 렌더링
};

// 텍스트 목록에 있는 모든 텍스트를 렌더링
const drawTexts = (ctx) => {
  texts.forEach(({ text, x, y, fontSize, fontFamily, color, fontWeight, fontStyle, backgroundColor, borderColor, borderWidth, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY }) => {
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    // 배경색상 처리
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(
        x - borderWidth,
        y - parseInt(fontSize),
        ctx.measureText(text).width + 2 * borderWidth,
        parseInt(fontSize) + 2 * borderWidth
      );
    }

    // 텍스트 그림자 처리
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;

    // 텍스트 색상 및 렌더링
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);


    // 그림자 초기화
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  });
};

// 실시간으로 입력 중인 텍스트를 렌더링
const drawLiveText = (ctx) => {
  if (currentText.trim()) {
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    // 배경색상 처리
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(
        textPosition.x - borderWidth,
        textPosition.y - parseInt(fontSize),
        ctx.measureText(currentText).width + 2 * borderWidth,
        parseInt(fontSize) + 2 * borderWidth
      );
    }

    // 텍스트 그림자 처리
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;

    // 텍스트 색상 및 렌더링
    ctx.fillStyle = textColor;
    ctx.fillText(currentText, textPosition.x, textPosition.y);


    // 그림자 초기화
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
};

useEffect(() => {
  renderCanvasContent();
}, [image, texts, currentText, textPosition, fontSize, fontFamily, textColor, fontWeight, fontStyle, backgroundColor, borderColor, borderWidth, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY]);






  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Navbar className="custom-navbar">
          <Container fluid>
            <Navbar.Brand href="/">SPARKLE</Navbar.Brand>
            <Nav className="me-auto" style={styles.navButtons}>
              <Link to="/send-message">
                <Button>문자 보내기</Button>
              </Link>
              <Link to="/message-history">
                <Button>문자 내역 보기</Button>
              </Link>
              <Link to="/address-book-manage">
                <Button>주소록 관리</Button>
              </Link>
            </Nav>
          </Container>
        </Navbar>

        <div style={styles.appContainer}>
          <Sidebar setActivePage={setActivePage} />
          <div style={styles.mainContent}>
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{
                border: '1px solid black',
                marginTop: '20px',
              }}
            ></canvas>

            {activePage === '이미지' && (
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            )}
{activePage === '텍스트' && (
  <div style={styles.textEditorContainer}>
    <input 
      type="text" 
      value={currentText} 
      onChange={(e) => setCurrentText(e.target.value)} 
      placeholder="텍스트 입력" 
      style={styles.textInput}
    />
    
    <div style={styles.inlineGroup}>
      <input 
        type="number" 
        value={fontSize} 
        onChange={(e) => setFontSize(e.target.value)} 
        placeholder="글꼴 크기" 
        style={styles.numberInput}
      />
      <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={styles.selectInput}>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>

    <div style={styles.inlineGroup}>
      <label style={styles.label}>텍스트 색상:</label>
      <input 
        type="color" 
        value={textColor} 
        onChange={(e) => setTextColor(e.target.value)} 
        style={styles.colorInput}
      />
      <label style={styles.label}>배경 색상:</label>
      <input 
        type="color" 
        value={backgroundColor} 
        onChange={(e) => setBackgroundColor(e.target.value)} 
        style={styles.colorInput}
      />
    </div>

   

    <div style={styles.inlineGroup}>
      <label style={styles.label}>그림자 색상:</label>
      <input 
        type="color" 
        value={shadowColor} 
        onChange={(e) => setShadowColor(e.target.value)} 
        style={styles.colorInput}
      />
      <label style={styles.label}>그림자 블러:</label>
      <input 
        type="number" 
        value={shadowBlur} 
        onChange={(e) => setShadowBlur(e.target.value)} 
        style={styles.numberInput}
      />
    </div>


    <div style={styles.inlineGroup}>
      <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} style={styles.selectInput}>
        <option value="normal">굵기</option>
        <option value="bold">굵게</option>
        <option value="lighter">얇게</option>
      </select>
      <label style={styles.checkboxLabel}>
    <input
      type="checkbox"
      checked={fontStyle === 'italic'}
      onChange={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
    />
    기울임꼴
  </label>
    </div>

    <div style={styles.inlineGroup}>
      <label style={styles.label}>X 위치:</label>
      <input
        type="range"
        min="0"
        max={CANVAS_WIDTH}
        value={textPosition.x}
        onChange={(e) => setTextPosition((prev) => ({ ...prev, x: parseInt(e.target.value) }))}
        style={styles.rangeInput}
      />
      <label style={styles.label}>Y 위치:</label>
      <input
        type="range"
        min="0"
        max={CANVAS_HEIGHT}
        value={textPosition.y}
        onChange={(e) => setTextPosition((prev) => ({ ...prev, y: parseInt(e.target.value) }))}
        style={styles.rangeInput}
      />
    </div>

    <button onClick={addText} style={styles.addButton}>텍스트 추가</button>
  </div>

)}

          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const styles = {
  textEditorContainer: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  textInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  numberInput: {
    width: '70px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  selectInput: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginLeft: '10px',
  },
  colorInput: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    border: 'none',
  },
  inlineGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginRight: '10px',
  },
  rangeInput: {
    width: '150px', // 슬라이더 너비 조정
    marginLeft: '10px',
  },
  inlineGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬
    marginBottom: '10px',
    gap: '10px', // 요소 간의 간격
  },
  label: {
    marginRight: '5px',
    minWidth: '60px', // 라벨의 최소 너비로 정렬을 고르게 유지
  },

  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  appContainer: {
    display: 'flex',
    padding: '20px',
    height: '100vh',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  sidebar: {
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  optionButton: {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  mainContent: {
    width: '85%',
  },
  inlineGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px', // 전체 요소 간의 간격
  },
  checkboxLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px', // 체크박스와 텍스트 사이의 간격
    whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
  },

};

export default ImageTemplate;
