import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPosts } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostFeed = () => {

    const [postPage, setPostPage] = useState({ content: [], last: true, number: 0 });

    const { username } = useParams(); //user sayfasından parametre olarak gelen username

    const url = username ? `/api/users/${username}/posts?page=` : '/api/posts?page='; //kullanıcıya ait postları getirirken api isteklerini de dinlemek için
    const pendingApiCallForGetPost = useApiProgress('get', url);

    const pendingApiCallForSendPost = useApiProgress('post', '/api/posts'); // yeni post eklendiğini takip etmek için

    useEffect(() => {
        if (!pendingApiCallForSendPost) {
            setPostPage({ content: [], last: true, number: 0 });
            loadPosts();
        }

    }, [pendingApiCallForSendPost]); //yeni post eklendiğinde tekrar çalışsın

    const loadPosts = async (page) => {
        try {
            const response = await getPosts(username, page);
            setPostPage((previousPostPage) => {
                return {
                    ...response.data,
                    content: [...previousPostPage.content, ...response.data.content]
                };
            });
        } catch (error) {

        }
    };

    const { content: posts, number, last } = postPage;

    if (posts.length === 0) { // post yoksa
        return (
            <div>
                {pendingApiCallForGetPost ? <Spinner /> : "No posts yet."}
            </div>
        );
    }

    return (
        <div>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post} />
            })}

            { !last && <div
                className="alert alert-primary mt-3 mb-5 text-center"
                style={{ cursor: "pointer" }}
                onClick={pendingApiCallForGetPost ? () => { } : () => loadPosts(number + 1)}>
                {pendingApiCallForGetPost ? <Spinner /> : "Load Old Posts..."}
            </div>}
        </div>
    );
};

export default PostFeed;