import React from 'react';
import PostSubmit from '../components/PostSubmit';
import UserList from '../components/UserList';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-8"><PostSubmit /></div>
                <div className="col-4"> <UserList /></div>
            </div>
        </div>
    );
};

export default HomePage;