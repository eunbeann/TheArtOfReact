//  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import NewsItem from './NewsItem'
import usePromise from '../lib/usePromise';


const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${WeatherAPIKEY}`,)
    }, [category])

    // 대기 중일 떄
    if (loading) {
        return <NewsItemBlock>대기 중...</NewsItemBlock>
    }
    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    // 에러가 발생했을 때
    if (error) {
        return <NewsItemBlock>에러 발생!</NewsItemBlock>
    }
    // response 값이 유효할 때
    const { articles } = response.data;
    return (
        <NewsItemBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
      </NewsItemBlock>
  )
}

export default NewsList