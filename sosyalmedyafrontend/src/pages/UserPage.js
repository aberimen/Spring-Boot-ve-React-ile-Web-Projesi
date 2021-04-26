import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserByUsername } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import PostFeed from '../components/PostFeed';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';

const UserPage = props => {

    const { username } = useParams();
    const [user, setUser] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/users/' + username, true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUserByUsername(username);
                setUser(response.data);
                setUserNotFound(false);
            } catch (error) {
                setUserNotFound(true);
            }
        };
        loadUser();
    }, [username]);

    if (userNotFound) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    Kullanıcı Bulunamadı...
                </div>
            </div>
        );
    }

    if (pendingApiCall || user.username !== username) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <ProfileCard user={user} />
                </div>
                <div className="col">
                    <PostFeed />
                </div>
            </div>
        </div>
    );
};

export default UserPage;