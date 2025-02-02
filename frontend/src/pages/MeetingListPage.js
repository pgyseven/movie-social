import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MeetingListPage() {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/meetings?page=${currentPage - 1}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.content)) {
          setMeetings(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Expected content array but got:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Header>
        <h1>모임 리스트</h1>
        <NewMeetingButton
          onClick={() => alert('새 모임 만들기 페이지 준비 중!')}
        >
          새 모임 만들기
        </NewMeetingButton>
      </Header>

      <MeetingList>
        {meetings.map((meeting) => (
          <MeetingItem key={meeting.meetingNo}>
            <h3>{meeting.meetingName}</h3>
            <p>{meeting.description}</p>
            {/* -------------------------- */}
            {/* 수정: 기존 참여자 -> 참여 가능 인원 */}
            <p>참여 가능 인원: {meeting.maxCnt}</p>
            {/* -------------------------- */}
            <p>날짜: {new Date(meeting.meetingDate).toLocaleDateString()}</p>
            <Link to={`/meetings/${meeting.meetingNo}`}>자세히 보기</Link>
          </MeetingItem>
        ))}
      </MeetingList>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i + 1}
            onClick={() => paginate(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PageNumber>
        ))}
      </Pagination>
    </Container>
  );
}

const Container = styled.div`
  background-color: #1c1b29;
  color: #ececec;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NewMeetingButton = styled.button`
  background-color: #ff4081;
  color: #ececec;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #e03570;
  }
`;

const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MeetingItem = styled.div`
  background-color: #2e2d3a;
  padding: 20px;
  border-radius: 8px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  color: ${(props) => (props.active ? '#ff4081' : '#ececec')};
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #2e2d3a;
  }
`;

export default MeetingListPage;
