package com.movie_social.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

// STOMP 메시지 컨트롤러이므로 @Controller 사용
@Controller
public class StompChatController {

    // 클라이언트에서 stompClient.send("/app/chat/{roomId}", ...) 로 보내면
    // 여기 @MessageMapping("/chat/{roomId}")로 들어옴
    @MessageMapping("/chat/{roomId}")
    // 그리고 구독중인 /topic/{roomId} 로 메시지 브로드캐스트
    @SendTo("/topic/{roomId}")
    public ChatMessage broadcast(ChatMessage message) {
        // message 내용을 그대로 반환하면, 구독 중인 클라이언트 전부에게 전송됨
        return message;
    }
    // ChatMessage DTO에 sender 필드 추가
    public static class ChatMessage {
        private String sender;   // 새로 추가
        private String message;  // 기존

        public ChatMessage() {
        }

        public ChatMessage(String sender, String message) {
            this.sender = sender;
            this.message = message;
        }

        // Getter/Setter
        public String getSender() {
            return sender;
        }
        public void setSender(String sender) {
            this.sender = sender;
        }

        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
    }
}