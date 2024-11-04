import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SendMessage from './SendMessage';
import AIChatBot from './AIChatBot';
import MessageHistory from './MessageHistory';
import MyPage from './MyPage';
import CreateImage from './CreateImage';
import AddressBookManage from './AddressBookManage';
import ImageTemplate from './ImageTemplate';
import FinishSendMessage from './FinishSendMessage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-message" element={<SendMessage />} />
        <Route path="/AI-chatbot" element={<AIChatBot />} />
        <Route path="/message-history" element={<MessageHistory />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/create-image" element={<CreateImage />} />
        <Route path="/address-book-manage" element={<AddressBookManage />} />
        <Route path="/image-template" element={<ImageTemplate />} />
        <Route path="/finish-send-message" element={<FinishSendMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
