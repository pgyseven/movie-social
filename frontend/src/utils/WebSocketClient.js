import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 전역(모듈 스코프)에 stompClient 선언
let stompClient = null;

export const connect = (roomId, onMessageReceived) => {
  // SockJS 연결
  const socket = new SockJS('http://localhost:8081/ws/chat');

  // 전역 stompClient에 할당
  stompClient = Stomp.over(socket);

  // 연결 시도
  stompClient.connect({}, () => {
    // 연결 성공하면 roomId 구독
    stompClient.subscribe(`/topic/${roomId}`, (msg) => {
      const body = JSON.parse(msg.body);
      // 메시지 수신 콜백
      onMessageReceived(body);
    });
  });
};

export const sendMessage = (roomId, text) => {
  // stompClient가 초기화되고 연결된 상태인지 체크
  if (stompClient && stompClient.connected) {
    // 서버 측 @MessageMapping("/chat/{roomId}")로 전송
    stompClient.send(
      `/app/chat/${roomId}`,
      {},
      JSON.stringify({ message: text }),
    );
  }
};
