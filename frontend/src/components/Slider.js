import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import axios from 'axios';

function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const API_KEY = '44c7e2876892c139a41aa9ee9001616e';
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
      } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3 /* 한 번에 표시할 슬라이드 개수 */,
    slidesToScroll: 1 /* 한 번에 스크롤할 슬라이드 개수 */,
  };

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {movies.map((movie) => (
          <Slide key={movie.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Slide>
        ))}
      </StyledSlider>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  max-width: 900px; /* 슬라이더 부모 컨테이너의 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    gap: 10px;
    transition: transform 0.5s ease; /* 애니메이션 효과 */
    will-change: transform; /* GPU 가속 최적화 */
  }

  .slick-prev {
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }

  .slick-prev::before,
  .slick-next::before {
    font-size: 24px; /* 화살표 크기 유지 */
    color: white; /* 화살표 색상 */
  }
`;

const Slide = styled.div`
  background: #121212;
  color: #f9f9f9;
  padding: 5px;
  border-radius: 8px;
  text-align: center;
`;

const Poster = styled.img`
  width: 250px;
  height: 375px;
  object-fit: cover;
  border-radius: 8px;
`;

export default MovieSlider;
