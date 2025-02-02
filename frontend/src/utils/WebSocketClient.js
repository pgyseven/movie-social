import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

/**
 * STOMP 연결하고, 메시지 수신 시 onMessageReceived 콜백 호출
 */
export const connect = (roomId, onMessageReceived) => {
  const socket = new SockJS('http://localhost:8081/ws/chat');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    // 구독
    stompClient.subscribe(`/topic/${roomId}`, (payload) => {
      const body = JSON.parse(payload.body);
      // body = { sender: "...", message: "..." }
      onMessageReceived(body);
    });
  });
};

/**
 * 메시지 전송
 * @param {string} roomId  방 번호 (모임 ID)
 * @param {string} sender  보낸 사람 닉네임
 * @param {string} text    메시지 내용
 */
export const sendMessage = (roomId, sender, text) => {
  if (stompClient && stompClient.connected) {
    // JSON: {sender, message}
    stompClient.send(
      `/app/chat/${roomId}`,
      {},
      JSON.stringify({ sender: sender, message: text }),
    );
  }
};
