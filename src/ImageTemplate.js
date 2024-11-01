import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
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

// DraggableImage 컴포넌트에서의 이미지 URL 수정
// function DraggableImage({ image }) {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemType.IMAGE,
//     item: { src: image.image_url }, // Freepik API에서 사용하는 이미지 URL
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <img
//       ref={drag}
//       src={image.image_url} // Freepik API에서 사용하는 이미지 URL
//       alt={image.title}
//       style={{ ...styles.image, opacity: isDragging ? 0.5 : 1 }}
//     />
//   );
// }

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

    const handleMouseMove = (e) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      const newHeight = Math.max(50, startHeight + (e.clientY - startY));
      setSize({ width: newWidth, height: newHeight });
      onResize(img.src, { width: newWidth, height: newHeight });
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
          borderRadius: '10px',
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

const DroppableArea = ({ onDrop, centerImages, setCenterImages, onImageClick }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType.IMAGE,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = monitor.getInitialClientOffset().x + delta.x;
      const top = monitor.getInitialClientOffset().y + delta.y;
      const centerOffset = document.getElementById('center-image').getBoundingClientRect();
      const adjustedLeft = left - centerOffset.left;
      const adjustedTop = top - centerOffset.top;

      const centerImageWidth = centerOffset.width;
      const centerImageHeight = centerOffset.height;

      const newPosition = {
        left: Math.max(0, Math.min(adjustedLeft, centerImageWidth - 100)),
        top: Math.max(0, Math.min(adjustedTop, centerImageHeight - 100)),
      };

      onDrop(item.src, newPosition);
    },
  }));

  const handleRemove = (src) => {
    setCenterImages((prev) => prev.filter(image => image.src !== src));
  };

  return (
    <div ref={drop} style={styles.centerContainer}>
      <img
        id="center-image"
        src="https://cdn.insanmedicine.com/news/photo/202109/642_899_117.jpg"
        alt="Center"
        style={styles.centerImage}
      />
      {centerImages.map((img, index) => (
        <ResizableImage
          key={index}
          img={{ ...img, size: img.size || { width: 100, height: 100 } }}
          onResize={(src, newSize) => {
            setCenterImages((prev) => 
              prev.map(image => image.src === src ? { ...image, size: newSize } : image)
            );
          }}
          onDrop={(src, position) => {
            const centerOffset = document.getElementById('center-image').getBoundingClientRect();
            const centerImageWidth = centerOffset.width;
            const centerImageHeight = centerOffset.height;

            const newPosition = {
              left: Math.max(0, Math.min(position.left, centerImageWidth - img.size.width)),
              top: Math.max(0, Math.min(position.top, centerImageHeight - img.size.height)),
            };

            setCenterImages((prev) => 
              prev.map(image => image.src === src ? { ...image, position: newPosition } : image)
            );
          }}
          onRemove={handleRemove}
          onClick={onImageClick} // 클릭 핸들러 전달
        />
      ))}
    </div>
  );
};

function ImageTemplate() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activePage, setActivePage] = useState('로고');
  const [senderNumber, setSenderNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [centerImages, setCenterImages] = useState([]);
  const [page, setPage] = useState(1);
  const galleryRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 추가

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogin = () => {
    console.log('아이디:', username);
    console.log('비밀번호:', password);
    closeModal();
  };

  const handleSenderNumberChange = (e) => setSenderNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendClick = () => {
    console.log("발신 번호:", senderNumber);
    console.log("주소:", address);
    console.log("메시지:", message);
    navigate('/finish-send-message');
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

  const onDrop = (src, position) => {
    setCenterImages((prev) => {
      const existingImage = prev.find(image => image.src === src);
      if (existingImage) {
        return prev.map(image => image.src === src ? { ...image, position } : image);
      }
      return [...prev, { src, position, size: { width: 100, height: 100 } }];
    });
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
  switch (activePage) {
    case '로고':
      return (
        <div>
          <h2>로고 삽입 화면입니다.</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      );
    case 'QR 코드':
            return (
        <div>
          <h2>QR 코드 삽입 화면입니다.</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      );
    case '텍스트':
      return <div><h2>텍스트 입력 화면입니다.</h2></div>;
    case '이미지':
      return (
        <div>
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
    height: '100vh',
    padding: '20px',
  },
  leftContainer: {
    width: '15%',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: '10px',
  },
  centerContainer: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerImage: {
    width: '90%',
    height: 'auto',
    border: '5px solid #007bff', // 테두리 추가
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // 그림자 추가
  },
  rightContainer: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionButton: {
    width: '60%',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
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
};

export default ImageTemplate;

