package com.movie_social.controller;

import com.movie_social.entity.ChatRoom;
import com.movie_social.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/create")
    public ChatRoom createRoom(@RequestParam String meetingName) {
        return chatService.createRoom(meetingName);
    }

    @GetMapping("/{roomId}")
    public ChatRoom getRoom(@PathVariable String roomId) {
        return chatService.getRoom(roomId);
    }
}
