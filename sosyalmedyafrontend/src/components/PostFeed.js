import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getNewPostCount, getOldPosts, getPosts } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostFeed = () => {

    const [postPage, setPostPage] = useState({ content: [], last: true, number: 0 });
    const [newPostCount, setNewPostCount] = useState(0);
    const { username } = useParams(); //user sayfasından parametre olarak gelen username

    const url = username ? `/api/users/${username}/posts?page=` : '/api/posts?page='; //kullanıcıya ait postları getirirken api isteklerini de dinlemek için
    const initialPostProgress = useApiProgress('get', url);

    const pendingApiCallForSendPost = useApiProgress('post', '/api/posts'); // yeni post eklendiğini takip etmek için

    let latsPostId = 0;
    let firstPostId = 0;
    if (postPage.content.length > 0) {
        const lastPostIndex = postPage.content.length - 1;
        latsPostId = postPage.content[lastPostIndex].id;

        firstPostId = postPage.content[0].id
    }

    const urlOldPost = username ? `/api/users/${username}/posts/` : '/api/posts/';
    const loadOldPostsProgress = useApiProgress('get', urlOldPost + latsPostId, true);

    useEffect(() => {
        let loop = setInterval(async () => {
            const response = await getNewPostCount(firstPostId);
            setNewPostCount(response.data.count);
        }, 1000);

        return () => { //unmount
            clearInterval(loop);
        };
    }, [firstPostId]);

    useEffect(() => {
        if (!pendingApiCallForSendPost) {
            setPostPage({ content: [], last: true, number: 0 });
            loadPosts();
        }

    }, []);

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

    const loadOldPosts = async () => {
        const response = await getOldPosts(username, latsPostId);
        try {
            setPostPage((previousPostPage) => {
                return {
                    ...response.data,
                    content: [...previousPostPage.content, ...response.data.content]
                };
            });
        } catch (error) {

        }
    };

    const { content: posts, last } = postPage;

    if (posts.length === 0) { // post yoksa
        return (
            <div>
                {initialPostProgress ? <Spinner /> : "No posts yet."}
            </div>
        );
    }

    return (
        <div>
            {newPostCount > 0 &&
                <div
                    className="alert alert-primary mt-3 mb-5 text-center"
                    style={{ cursor: "pointer" }}>
                    Load new Posts...
            </div>
            }

            {posts.map((post) => {
                return <PostItem key={post.id} post={post} />
            })}

            { !last && <div
                className="alert alert-primary mt-3 mb-5 text-center"
                style={{ cursor: "pointer" }}
                onClick={loadOldPostsProgress ? () => { } : () => loadOldPosts()}>
                {loadOldPostsProgress ? <Spinner /> : "Load Old Posts..."}
            </div>}
        </div>
    );
};

export default PostFeed;