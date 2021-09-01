import React from 'react';
import Header from '../components/common/Header';
import PostList from '../components/posts/PostList';
import Pagination from '../components/posts/Pagination';

const PostListPage = () => {
    return (
        <>
        <Header />
        <PostList />
        <Pagination />
        </>
    );
};

export default PostListPage;