package com.movie_social.service;

import com.movie_social.entity.Meeting;
import com.movie_social.repository.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public List<Meeting> getTop10Meetings() {
        return meetingRepository.findTop10ByOrderByMemberCntAndRegDate();
    }
}
