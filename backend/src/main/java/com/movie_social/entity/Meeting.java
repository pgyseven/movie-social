package com.movie_social.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingNo; // Primary Key

    private Long movieId; // 영화 ID

    private double xCoordinate; // X 좌표
    private double yCoordinate; // Y 좌표 (오타 수정)

    private int memberCnt; // 현재 참여자 수
    private int maxCnt;    // 최대 참여자 수

    @Column(length = 1000)
    private String description; // 모임 설명

    private String meetingName; // 모임 이름
    private LocalDateTime meetingDate; // 모임 날짜
    private LocalDateTime regDate = LocalDateTime.now(); // 등록 날짜

    private boolean activate = true; // 활성화 여부
}
