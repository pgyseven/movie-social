package com.movie_social.service;

import com.movie_social.entity.Meeting;
import com.movie_social.repository.MeetingRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.domain.Page;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    // (추가) 단건 조회 로직
    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found with id=" + id));
    }

    public List<Meeting> getTop10Meetings() {
        return meetingRepository.findTop10ByOrderByMemberCntAndRegDate();
    }

    public Page<Meeting> getMeetings(Pageable pageable) {
        return meetingRepository.findAll(pageable);
    }
}
