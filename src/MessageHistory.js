import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import
import './App.css'; // CSS 파일 import
import axios from 'axios';


function MessageHistory() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const ACCESS_KEY = 'pENSa0wti4szpP4lfl0nqgmq4rwJDEKRr_cfXG0Bkk0';
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: { query: query },
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
        });
        setImages(response.data.results);
    } catch (error) {
        console.error('Error fetching images', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
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

      <h1>Unsplash 이미지 검색기</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="검색할 텍스트를 입력하세요"
                />
                <button type="submit">검색</button>
            </form>
            <div className="image-gallery">
                {images.map((image) => (
                    <img key={image.id} src={image.urls.small} alt={image.alt_description} />
                ))}
            </div>
            <style jsx>{`
                .image-gallery {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                img {
                    width: auto;
                    height: auto;
                }
            `}</style>

    </div>
  );
}

export default MessageHistory;
