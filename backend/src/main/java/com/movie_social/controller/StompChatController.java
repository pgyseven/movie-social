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

    // 메시지 형식 DTO (간단 버전)
    public static class ChatMessage {
        private String message;

        public ChatMessage() {
        }

        public ChatMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
