import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import PostItem from './PostItem';

const PostFeed = () => {

    const [postPage, setPostPage] = useState({ content: [] });

    const pendingApiCallForSendPost = useApiProgress('post', '/api/posts'); // yeni post eklendiğini takip etmek için
    const pendingApiCallForGetPost = useApiProgress('get', '/api/posts');

    useEffect(() => {
        loadPosts();
    }, [pendingApiCallForSendPost]); //yeni post eklendiğinde tekrar çalışsın

    const loadPosts = async () => {
        try {
            const response = await getPosts();
            setPostPage(response.data);
        } catch (error) {

        }
    };

    const { content: posts } = postPage;

    if (posts.length === 0) { // post yoksa
        return (
            <div>
                No posts yet.
            </div>
        );
    }

    return (
        <div>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post} />
            })}
        </div>
    );
};

export default PostFeed;