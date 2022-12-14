//  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import NewsItem from './NewsItem'


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

const NewsList = ({ category }) => {
    
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);
    const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
    useEffect(() => {
        // async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${WeatherAPIKEY}`,
                );
                console.log("response", response.config.url)
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }; fetchData();
        // 카테고리 클릭시마다 렌더링 안돼서 이유가 뭐지 했는데 여기 []에 category 안 넣어줘서 그런거였음
    }, [category]);
    // 대기 중일 떄
    if (loading) {
        return <NewsItemBlock>대기 중...</NewsItemBlock>
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!articles) {
        return null;
    }
    // articles 값이 유효할 때    
    return (
        <NewsItemBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
      </NewsItemBlock>
  )
}

export default NewsList