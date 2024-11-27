import React from 'react';
import styled from 'styled-components';
import MovieSlider from '../components/Slider'; // 슬라이더 컴포넌트 가져오기

function MainPage() {
  return (
    <Container>
      <Header>
        <Logo>🎥 Movie SNS</Logo>
        <Nav>
          <NavItem>영화 리스트</NavItem>
          <NavItem>모임 리스트</NavItem>
          <NavItem>마이페이지</NavItem>
        </Nav>
      </Header>

      <Content>
        <Section>
          <h2>인기 영화</h2>
          <MovieSlider /> {/* 슬라이더 컴포넌트 추가 */}
        </Section>

        <Section>
          <h2>사용자 추천 모임</h2>
          {/* 사용자 추천 모임 리스트 */}
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

const NavItem = styled.a`
  color: #ececec;
  text-decoration: none;
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

export default MainPage;
