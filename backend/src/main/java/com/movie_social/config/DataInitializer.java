package com.movie_social.config;

import com.movie_social.entity.Meeting;
import com.movie_social.repository.MeetingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(MeetingRepository meetingRepository) {
        return args -> {
            Meeting meeting1 = new Meeting();
            meeting1.setMovieId(1L);
            meeting1.setXCoordinate(37.5665); // 수정된 메서드
            meeting1.setYCoordinate(126.9780); // 수정된 메서드
            meeting1.setMemberCnt(5);
            meeting1.setMaxCnt(10);
            meeting1.setDescription("영화를 사랑하는 사람들의 모임");
            meeting1.setMeetingName("영화 동호회");
            meeting1.setMeetingDate(LocalDateTime.of(2024, 12, 20, 18, 0));
            meetingRepository.save(meeting1);

            Meeting meeting2 = new Meeting();
            meeting2.setMovieId(2L);
            meeting2.setXCoordinate(37.4563); // 수정된 메서드
            meeting2.setYCoordinate(127.0428); // 수정된 메서드
            meeting2.setMemberCnt(7);
            meeting2.setMaxCnt(15);
            meeting2.setDescription("최신 영화 감상을 위한 모임");
            meeting2.setMeetingName("최신 영화 감상 클럽");
            meeting2.setMeetingDate(LocalDateTime.of(2024, 12, 22, 20, 0));
            meetingRepository.save(meeting2);
        };
    }
}
