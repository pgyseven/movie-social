import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Axios 추가
import MovieSlider from '../components/Slider'; // 슬라이더 컴포넌트

function MainPage() {
  const [meetings, setMeetings] = useState([]); // 모임 데이터를 저장할 상태 추가

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/meetings/top10') // API 요청
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        setMeetings(response.data); // 상태 업데이트
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Logo>🎥 Movie SNS</Logo>
        <Nav>
          <NavItem>
            <StyledLink to="/">메인 페이지</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/meetings">모임 리스트</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/mypage">마이페이지</StyledLink>
          </NavItem>
        </Nav>
      </Header>

      <Content>
        <Section>
          <h2>인기 영화</h2>
          <MovieSlider />
        </Section>

        <Section>
          <h2>사용자 추천 모임</h2>
          <MeetingList>
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.meetingNo}>
                <h3>{meeting.meetingName}</h3>
                <p>{meeting.description}</p>
                <p>
                  참여 인원: {meeting.memberCnt} / {meeting.maxCnt}
                </p>
              </MeetingCard>
            ))}
          </MeetingList>
        </Section>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: #1c1b29;
  color: #ececec;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.h1`
  color: #ff4081;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ececec;
  &:hover {
    color: #ff4081;
  }
`;

const Content = styled.main`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const MeetingList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const MeetingCard = styled.div`
  background-color: #2c2b3e;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  h3 {
    margin: 0;
    font-size: 18px;
    color: #ff4081;
  }
  p {
    margin: 8px 0;
    color: #ececec;
    font-size: 14px;
  }
`;

export default MainPage;
