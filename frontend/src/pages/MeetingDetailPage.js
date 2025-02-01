import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, sendMessage } from '../utils/WebSocketClient';
import axios from 'axios';
import styled from 'styled-components';

function MeetingDetailPage() {
  // URL 파라미터에서 meetingId 추출
  const { meetingId } = useParams();

  // 모임 정보 state
  const [meeting, setMeeting] = useState(null);

  // 채팅 메시지 state
  const [messages, setMessages] = useState([]);

  // 입력창 state
  const [input, setInput] = useState('');

  // 1) 모임 상세 정보 로드
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/meetings/${meetingId}`)
      .then((response) => {
        setMeeting(response.data);
      })
      .catch((err) => console.error(err));
  }, [meetingId]);

  // 2) 웹소켓 연결 & 구독
  useEffect(() => {
    // roomId = meetingId로 사용 (백엔드 @MessageMapping("/chat/{roomId}")
    connect(meetingId, (received) => {
      // received = { message: '...' } 형태(백엔드 DTO 구조)
      setMessages((prev) => [...prev, received.message]);
    });
  }, [meetingId]);

  // 3) 메시지 전송
  const handleSend = () => {
    if (input.trim() === '') return;
    // sendMessage(roomId, message)
    sendMessage(meetingId, input);
    setInput('');
  };

  // 데이터 로딩 중
  if (!meeting) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>{meeting.meetingName}</h1>
      <p>{meeting.description}</p>
      <p>
        참여자: {meeting.memberCnt} / {meeting.maxCnt}
      </p>
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
