package com.movie_social.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 1) STOMP 엔드포인트 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 프론트에서 SockJS를 연결하는 경로: http://localhost:8081/ws/chat
        // .withSockJS() 가 붙으면 SockJS를 활성화
        registry.addEndpoint("/ws/chat")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    // 2) 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트가 구독(subscribe)할 prefix: /topic
        config.enableSimpleBroker("/topic");
        // 클라이언트가 메시지를 보낼 때 prefix: /app
        config.setApplicationDestinationPrefixes("/app");
    }
}
