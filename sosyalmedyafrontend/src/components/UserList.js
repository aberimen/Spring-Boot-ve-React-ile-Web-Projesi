import React, { Component } from 'react';
import { getUsers } from '../api/apiCall';

class UserList extends Component {

    state = { users: [] };

    componentDidMount() {
        getUsers().then(response => {
            this.setState({ users: response.data });
        })
    }
    render() {
        const { users } = this.state;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((user, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                </tr>)
                        }

                        )}


                    </tbody>



                </table>
            </div>
        );
    }
}

export default UserList;