package com.movie_social.repository;

import com.movie_social.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    @Query("SELECT m FROM Meeting m ORDER BY m.memberCnt DESC, m.regDate DESC")
    List<Meeting> findTop10ByOrderByMemberCntAndRegDate();
}
