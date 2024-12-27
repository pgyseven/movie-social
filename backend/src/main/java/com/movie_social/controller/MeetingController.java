package com.movie_social.controller;

import com.movie_social.entity.Meeting;
import com.movie_social.service.MeetingService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/top10")
    public List<Meeting> getTop10Meetings() {
        return meetingService.getTop10Meetings();
    }

    @GetMapping
    public Page<Meeting> getMeetings(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return meetingService.getMeetings(PageRequest.of(page, size));
    }
}
