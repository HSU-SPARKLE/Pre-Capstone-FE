import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const UNSPLASH_ACCESS_KEY = 'pENSa0wti4szpP4lfl0nqgmq4rwJDEKRr_cfXG0Bkk0';
// const FREEPIK_ACCESS_KEY = 'FPSX635f8874fb044212b7f4c1e2891f18e3'; // Freepik API 키


const ItemType = {
  IMAGE: 'image',
};


function DraggableImage({ image }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.IMAGE,
    item: { src: image.urls.small },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={image.urls.small}
      alt={image.alt_description}
      style={{ ...styles.image, opacity: isDragging ? 0.5 : 1 }}
    />
  );
}

function ResizableImage({ img, onResize, onDrop, onRemove, onClick }) {
  const [size, setSize] = useState(img.size);
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.IMAGE,
    item: { src: img.src, position: img.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [img.src, img.position]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const aspectRatio = startWidth / startHeight; // 비율 저장

    const handleMouseMove = (e) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      const newHeight = newWidth / aspectRatio; // 비율 유지

      // 최대 크기 제한
      const constrainedWidth = Math.min(newWidth, 400);
      const constrainedHeight = Math.min(newHeight, 600);

      // 비율 유지하며 최대 크기 적용
      if (constrainedWidth / aspectRatio <= 600) {
        setSize({ width: constrainedWidth, height: constrainedWidth / aspectRatio });
      } else {
        setSize({ width: constrainedWidth, height: constrainedHeight });
      }

      onResize(img.src, { width: constrainedWidth, height: constrainedHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={drag}
      onClick={() => onClick(img.src)} // 이미지 클릭 시 호출
      style={{
        position: 'absolute',
        display: 'inline-block',
        left: img.position.left,
        top: img.position.top,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isHovered ? '0 4px 10px rgba(0, 0, 0, 0.5)' : 'none',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={img.src}
        alt="Dropped Image"
        style={{
          width: size.width,
          height: size.height,
          position: 'relative',
        }}
      />
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '20px',
          height: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          cursor: 'nwse-resize',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease',
        }}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(img.src);
        }}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'black',
          fontSize: '20px',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease',
        }}
      >
        &times;
      </button>
    </div>
  );
}




const DroppableArea = ({ onDrop, centerImages, setCenterImages, onImageClick, canvasRef }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType.IMAGE,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = monitor.getInitialClientOffset().x + delta.x;
      const top = monitor.getInitialClientOffset().y + delta.y;
      const centerOffset = document.getElementById('center-image').getBoundingClientRect();
      const adjustedLeft = left - centerOffset.left;
      const adjustedTop = top - centerOffset.top;

      const newPosition = {
        left: Math.max(0, Math.min(adjustedLeft, centerOffset.width - 100)),
        top: Math.max(0, Math.min(adjustedTop, centerOffset.height - 100)),
      };

      // 드롭된 이미지 처리
      onDrop(item.src, newPosition);
    },
  }));

  const handleRemove = (src) => {
    setCenterImages(prev => prev.filter(image => image.src !== src));
  };

  return (
    <div ref={drop} style={styles.centerContainer}>
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        id="center-image"
      />
        
      {centerImages.map((img, index) => (
        <ResizableImage
          key={index}
          img={img}
          onResize={(src, newSize) => {
            setCenterImages(prev => 
              prev.map(image => image.src === src ? { ...image, size: newSize } : image)
            );
          }}
          onRemove={handleRemove}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
};

function ImageTemplate({ setCapturedImageUrl }) { // props로 setCapturedImageUrl 추가

  //텍스트 관련
  const location = useLocation();
  const [image, setImage] = useState(location.state?.image?.src || null);
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [fontSize, setFontSize] = useState('24');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState(1);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;
  const [uploadedFileName, setUploadedFileName] = useState(''); // 주소록 파이 이름 저장
  const [file, setFile] = useState(null); // 파일 상태 추가

  // 주소록 파일 업로드
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setUploadedFileName(file.name); // 선택한 파일 이름 설정
    }
  };

// 텍스트 추가 시 위치를 이미지 중앙으로 설정
const addText = () => {
  if (currentText.trim()) {
    setTexts((prevTexts) => 
      [...prevTexts, {
        id: prevTexts.length, // 각 텍스트 항목에 고유한 ID를 할당
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
      }]
    );

    // 입력 필드 초기화
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

  centerImages.forEach((img) => {
    const image = new Image();
    image.src = img.src;
    image.onload = () => {
      ctx.drawImage(image, img.position.left, img.position.top, img.size.width, img.size.height);
    };
  });
  
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

// drawTexts 함수 수정
const drawTexts = (ctx) => {
  texts.forEach((textObj) => {
    const { text, x, y, fontSize, fontFamily, color, fontWeight, fontStyle, backgroundColor, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = textObj;
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    

    // 배경색상 처리
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(
        x - 2,
        y - parseInt(fontSize, 10),
        ctx.measureText(text).width + 4,
        parseInt(fontSize, 10) + 4
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
  if (location.state && location.state.image) {
    setImage(location.state.image);
  }
}, [location.state]);

useEffect(() => {
  renderCanvasContent();
}, [image, texts, currentText, textPosition, fontSize, fontFamily, textColor, fontWeight, fontStyle, backgroundColor, borderColor, borderWidth, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY]);

  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activePage, setActivePage] = useState('로고');
  const [senderNumber, setSenderNumber] = useState('');
  const [testSendPhoneNumber, setTestSendPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [centerImages, setCenterImages] = useState([]);
  const [page, setPage] = useState(1);
  const galleryRef = useRef(null);
  

  
  const canvasRef = useRef(null); // 캔버스 참조 추가

  
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 추가

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogin = () => {
    console.log('아이디:', username);
    console.log('비밀번호:', password);
    closeModal();
  };

  const handleSenderNumberChange = (e) => setSenderNumber(e.target.value);
  const handleTestSendPhoneNumber = (e) => setTestSendPhoneNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendClick = async () => {
    const userId = 1;
    const requestDto = {
      "sendMessage": message,
      "completeImageURL": captureAndSaveImage(canvasRef),
      "sendPhoneNumber": "01099188389",
      "testSendPhoneNumber": testSendPhoneNumber,
      "sendType": 0,
      "sendDateTime": "2024-11-04"
    };

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file); // 파일 추가
    formData.append("requestDto", JSON.stringify(requestDto)); // JSON 객체를 문자열로 변환하여 추가

    try {
      const response = await axios.post(`/api/message/send/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송을 위해 헤더 설정
        },
      });
      console.log("전송 성공:", response.data);
      navigate('/finish-send-message');
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
    }
  };

  // 이미지를 캡쳐하여 저장하는 함수
  const captureAndSaveImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 중앙 이미지 크기 설정
    const centerImageWidth = 400;
    const centerImageHeight = 600;

    // 캔버스 크기 설정
    canvas.width = centerImageWidth;
    canvas.height = centerImageHeight;

    // 중앙 이미지 객체 생성
    const centerImg = new Image();
    centerImg.crossOrigin = 'Anonymous'; // CORS 허용
    centerImg.src = image;

    centerImg.onload = () => {
        // 중앙 이미지 그리기
        context.drawImage(centerImg, 0, 0, centerImageWidth, centerImageHeight);

        // 모든 추가 이미지 그리기 위한 Promise 배열
        const imagePromises = centerImages.map(img => {
            return new Promise((resolve) => {
                const image = new Image();
                image.crossOrigin = 'Anonymous'; // CORS 허용
                image.src = img.src;

                image.onload = () => {
                    const aspectRatio = image.width / image.height;
                    const newWidth = img.size.width; // 설정된 너비
                    const newHeight = newWidth / aspectRatio; // 비율에 따라 높이 계산

                    // 위치 조정
                    const adjustedLeft = img.position.left; 
                    const adjustedTop = img.position.top; 

                    context.drawImage(image, adjustedLeft, adjustedTop, newWidth, newHeight);
                    resolve();
                };
            });
        });

        // 모든 이미지가 그려진 후 텍스트 그리기
        Promise.all(imagePromises).then(() => {
            // 텍스트 그리기
            drawTexts(context); // 기존 텍스트 그리기
            drawLiveText(context); // 실시간 입력 중인 텍스트 그리기

            // 데이터 URL로 변환
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImageUrl(dataUrl); // 상태 업데이트
            console.log("저장된 이미지 URL:", dataUrl); // 이미지 URL 출력
        });
    };
};



// 이미지 가져오기 로직 수정
const fetchImages = async () => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: searchKeyword,
        client_id: UNSPLASH_ACCESS_KEY,
        page: page,
        per_page: 30,
      },
    });
    setImages((prevImages) => [...prevImages, ...response.data.results]);
  } catch (error) {
    console.error("이미지 가져오기 오류:", error);
  }
};


  const handleSearch = () => {
    if (searchKeyword) {
      setImages([]); // 검색 시 이미지를 초기화
      setPage(1); // 페이지를 1로 초기화
      fetchImages(); // 이미지를 가져옴
    }
  };

  const handleScroll = () => {
    const gallery = galleryRef.current;
    if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight) {
      setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchImages(); // 페이지가 변경될 때마다 이미지를 가져옴
    }
  }, [page]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (gallery) {
        gallery.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  // onDrop 함수 수정
  const onDrop = (src, position) => {
    const newImage = new Image();
    newImage.src = src;
  
    newImage.onload = () => {
      const originalWidth = newImage.width;
      const originalHeight = newImage.height;
  
      // 최대 크기 설정
      const maxWidth = 200; // 원하는 최대 너비
      const maxHeight = 300; // 원하는 최대 높이
  
      // 비율 유지하며 크기 조정
      let newWidth, newHeight;
      if (originalWidth / originalHeight > maxWidth / maxHeight) {
        newWidth = Math.min(originalWidth, maxWidth);
        newHeight = (originalHeight / originalWidth) * newWidth;
      } else {
        newHeight = Math.min(originalHeight, maxHeight);
        newWidth = (originalWidth / originalHeight) * newHeight;
      }
  
      // 상태 업데이트
      setCenterImages(prev => {
        const existingImage = prev.find(image => image.src === src);
        if (existingImage) {
          // 이미지가 이미 존재하면 위치만 업데이트
          return prev.map(image => image.src === src ? { ...image, position } : image);
        }
        // 새로운 이미지 추가
        return [...prev, { src, position, size: { width: newWidth, height: newHeight } }];
      });
    };
  };
  
  
  
  
  

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      const centerOffset = document.getElementById('center-image').getBoundingClientRect();
      const centerImageWidth = centerOffset.width;
      const centerImageHeight = centerOffset.height;
  
      setCenterImages((prev) =>
        prev.map(image => {
          if (image.src === selectedImage) {
            const newPosition = { ...image.position };
  
            switch (e.key) {
              case 'ArrowUp':
                newPosition.top = Math.max(0, newPosition.top - 5);
                break;
              case 'ArrowDown':
                newPosition.top = Math.min(centerImageHeight - image.size.height, newPosition.top + 5);
                break;
              case 'ArrowLeft':
                newPosition.left = Math.max(0, newPosition.left - 5); // 왼쪽 경계
                break;
              case 'ArrowRight':
                newPosition.left = Math.min(centerImageWidth - image.size.width, newPosition.left + 5); // 오른쪽 경계
                break;
              default:
                break;
            }
  
            return { ...image, position: newPosition };
          }
          return image;
        })
      );
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);


// ImageTemplate 컴포넌트의 renderContent 함수 수정
const renderContent = () => {
  const contentStyle = {
    width: '100%', // 최대 너비 설정
    padding: '20px', // 내부 여백
    margin: '0 auto', // 중앙 정렬
    backgroundColor: '#fff', // 배경색
    borderRadius: '8px', // 모서리 둥글게
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // 그림자 효과
  };

  switch (activePage) {
    case '로고':
      return (
        <div style={contentStyle}>
          <h2>로고 삽입 화면입니다.</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      );
    case 'QR 코드':
      return (
        <div style={contentStyle}>
          <h2>QR 코드 삽입 화면입니다.</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      );
    case '텍스트':
      return (
        <div style={{ ...contentStyle, ...styles.textEditorContainer }}>
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
          </div>
          <div style={styles.inlineGroup}>
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
      );
    case '이미지':
      return (
        <div style={contentStyle}>
          <h2>이미지 삽입 화면입니다.</h2>
          <input 
            type="text" 
            value={searchKeyword} 
            onChange={(e) => setSearchKeyword(e.target.value)} 
            placeholder="검색 키워드 입력"
          />
          <button onClick={handleSearch}>검색</button>
          <div ref={galleryRef} style={styles.imageGallery}>
            {images.map((image) => (
              <DraggableImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Enter 키를 처리하는 이벤트 핸들러
const handleSearchKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch(); // 검색 함수 호출
  }
};

// 로컬 이미지 업로드 핸들러 추가
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const localImage = {
        src: reader.result,
        position: { left: 0, top: 0 },
        size: { width: 100, height: 100 }
      };
      onDrop(localImage.src, localImage.position);
    };
    reader.readAsDataURL(file);
  }
};


  return (
    <DndProvider backend={HTML5Backend}>
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
          <div style={styles.leftContainer}>
            <Sidebar setActivePage={setActivePage} />
          </div>

          <div style={styles.contentContainer}>
            {renderContent()}
          </div>

          <DroppableArea 
            onDrop={onDrop} 
            centerImages={centerImages} 
            setCenterImages={setCenterImages} 
            onImageClick={handleImageClick} // 클릭 핸들러 전달
            canvasRef={canvasRef}
          />

          <div style={styles.rightContainer}>
            <h3>발신자 번호 입력</h3>
            <input 
              type="text" 
              value={senderNumber} 
              onChange={handleSenderNumberChange} 
              placeholder="010-0000-0000"
              style={styles.inputField} 
            />

            
            <h3>수신 주소록 선택</h3>
            <button style={styles.button} onClick={() => document.getElementById('file-upload').click()}>
              주소록 업로드
            </button>
            <input 
              id="file-upload" 
              type="file" 
              accept=".xls,.xlsx" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} // 숨김 처리
            />
            {uploadedFileName && <p style={styles.uploadedFileName}>{uploadedFileName}</p>} {/* 파일 이름 표시 */}

            <input 
              type="text" 
              value={testSendPhoneNumber} 
              onChange={handleTestSendPhoneNumber} 
              placeholder="단일 수신번호 입력"
              style={styles.inputField} 
            />


            {/* <select value={address} onChange={handleAddressChange} style={styles.selectField}>
              <option value="">주소록</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
            </select> */}

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
              {/* <button style={styles.smallButton}>즉시 발송</button>
              <button style={styles.smallButton}>예약 발송</button>
              <button style={styles.smallButton}>테스트 발송</button> */}
            </div>

            <button onClick={handleSendClick} style={styles.sendButton}>발송하기</button>
          </div>
        </div>

        <button className="custom-floating-button floating-button" onClick={openModal}>
          {'<<'}
        </button>

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
    </DndProvider>
  );
}

// 사이드바 컴포넌트
function Sidebar({ setActivePage }) {
  const buttons = [
    { icon: '', text: '로고' },
    { icon: '', text: 'QR 코드' },
    { icon: '', text: '텍스트' },
    { icon: '', text: '이미지' }
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

// 스타일 객체
const styles = {
  appContainer: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden', // 전체 스크롤 방지
  },
  leftContainer: {
    width: '10%',
    paddingRight: '10px',
  },
  contentContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    width: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerImage: {
    width: '400px',
    height: '600px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // 그림자 추가
  },
  rightContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  sidebar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    height: '80px',
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
  imageGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflowY: 'scroll',
    height: '400px',
  },
  image: {
    width: '30%',
    marginBottom: '10px',
  },
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
    gap: '10px', // 전체 요소 간의 간격
  },
  label: {
    marginRight: '10px',
    minWidth: '60px', // 라벨의 최소 너비로 정렬을 고르게 유지
  },
  rangeInput: {
    width: '150px', // 슬라이더 너비 조정
    marginLeft: '10px',
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
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px', // 체크박스와 텍스트 사이의 간격
    whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
  },
};


export default ImageTemplate;

