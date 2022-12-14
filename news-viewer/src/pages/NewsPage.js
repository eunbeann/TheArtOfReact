import React from 'react'
import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({match}) => {
    // 카테고리 미선택시 기본값은 all
    // 
    const params = useParams();
    const category = params.category || 'all';
    return (
        <>
            <Categories />
            <NewsList category={category} />
      </>
  )
}

export default NewsPage