import React, { Component } from 'react';
import { getUsers } from '../api/apiCall';
import UserListItem from './UserListItem';

class UserList extends Component {

    state = { users: [] };

    componentDidMount() {
        getUsers().then(response => {
            this.setState({ users: response.data.content });
        })
    }
    render() {
        const { users } = this.state;
        return (
            <div>
                
                <div className="list-group list-group-flush">
                    {users.map((user) => {
                        return <UserListItem user={user} key={user.username} />
                    })}

                </div>
            </div>
        );
    }
}

export default UserList;