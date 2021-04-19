import React, { Component } from 'react';
import { getUsers } from '../api/apiCall';
import UserListItem from './UserListItem';

class UserList extends Component {

    state = {
        page: {
            content: [],
            number: 0,
            limit: 5
        }
    };

    componentDidMount() {
        this.loadUserPage(this.state.page.number);

    }
    loadUserPage(page) {
        getUsers(page).then(response => {
            this.setState({ page: response.data });
        });

    }

    render() {
        const { content: users, number, last, first } = this.state.page;
        return (
            <div>
                <div className="card" style={{ height: "450px" }}>
                    <div class="card-body">
                        <h5 class="card-title">Kullanıcılar</h5>
                        <div className="list-group list-group-flush p-3">
                            {users.map((user) => {
                                return <UserListItem user={user} key={user.username} />
                            })}

                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${first == true && "disabled"}`}>
                            <button className="page-link shadow-none" onClick={() => this.loadUserPage(number - 1)}>Previous</button>
                        </li>
                        <li className="page item">
                            <div className="page-link" >{number + 1}</div>
                        </li>
                        <li className={`page-item ${last == true && "disabled"}`}>
                            <button className="page-link shadow-none" onClick={() => this.loadUserPage(number + 1)}>Next</button>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default UserList;