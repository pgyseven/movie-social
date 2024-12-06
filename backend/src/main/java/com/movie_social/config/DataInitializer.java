package com.movie_social.config;

import com.movie_social.entity.Meeting;
import com.movie_social.repository.MeetingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MeetingRepository meetingRepository;

    public DataInitializer(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 더미 데이터 생성
        Meeting meeting1 = new Meeting();
        meeting1.setMeetingName("영화 모임 A");
        meeting1.setMemberCnt(10);
        meeting1.setMaxCnt(20);
        meeting1.setX(37.5665);
        meeting1.setY(126.9780);
        meeting1.setDescription("서울에서 진행하는 영화 모임");
        meeting1.setActivate(true);

        Meeting meeting2 = new Meeting();
        meeting2.setMeetingName("영화 모임 B");
        meeting2.setMemberCnt(8);
        meeting2.setMaxCnt(15);
        meeting2.setX(37.4563);
        meeting2.setY(127.0428);
        meeting2.setDescription("경기도에서 진행하는 영화 모임");
        meeting2.setActivate(true);

        meetingRepository.save(meeting1);
        meetingRepository.save(meeting2);

        System.out.println("더미 데이터 삽입 완료!");
    }
}
