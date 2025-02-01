package com.movie_social.service;

import com.movie_social.entity.ChatRoom;
import com.movie_social.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public ChatRoom createRoom(String meetingName) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setMeetingName(meetingName);
        return chatRoomRepository.save(chatRoom);
    }

    public ChatRoom getRoom(String roomId) {
        return chatRoomRepository.findByRoomId(roomId);
    }
}
