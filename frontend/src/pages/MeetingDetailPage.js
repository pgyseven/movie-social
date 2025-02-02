import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { connect, sendMessage } from '../utils/WebSocketClient';
// 방금 만든 nickname 함수 import
import { getOrCreateNickname } from '../utils/nickname';

function MeetingDetailPage() {
  const { meetingId } = useParams();

  const [meeting, setMeeting] = useState(null);

  // 채팅 메시지 목록
  const [messages, setMessages] = useState([]);

  // 입력창
  const [input, setInput] = useState('');

  // 브라우저에서 임의의 닉네임 불러오기
  // (최초 한 번 생성되며, localStorage에 저장됨)
  const [nickname] = useState(getOrCreateNickname());

  // 1) 모임 상세 정보 로드
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/meetings/${meetingId}`)
      .then((res) => {
        setMeeting(res.data);
      })
      .catch((err) => console.error(err));
  }, [meetingId]);

  // 2) 웹소켓 연결 & 구독
  useEffect(() => {
    connect(meetingId, (received) => {
      // received = { sender: "...", message: "..." }
      // 화면 표시: "User-1234: 안녕하세요"
      setMessages((prev) => [
        ...prev,
        `${received.sender}: ${received.message}`,
      ]);
    });
  }, [meetingId]);

  // 3) 메시지 전송
  const handleSend = () => {
    if (input.trim() === '') return;
    // (roomId, sender, text)
    sendMessage(meetingId, nickname, input);
    setInput('');
  };

  if (!meeting) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>{meeting.meetingName}</h1>
      <p>{meeting.description}</p>
      <p>참여 가능 인원: {meeting.maxCnt}</p>
      <p>날짜: {new Date(meeting.meetingDate).toLocaleDateString()}</p>

      <ChatBox>
        <MessageList>
          {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </MessageList>
        <InputArea>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={handleSend}>보내기</button>
        </InputArea>
      </ChatBox>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  color: #ececec;
  background-color: #1c1b29;
  min-height: 100vh;
`;

const ChatBox = styled.div`
  margin-top: 30px;
`;

const MessageList = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }
`;

export default MeetingDetailPage;
