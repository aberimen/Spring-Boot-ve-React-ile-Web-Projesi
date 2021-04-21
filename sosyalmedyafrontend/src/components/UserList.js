import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import Spinner from './Spinner';
import UserListItem from './UserListItem';

const UserList = props => {

    const [loadFailure, setLoadFailure] = useState(false);
    const [usersState, setUsersState] = useState({
        page: {
            content: [],
            number: 0,
            limit: 5,
            first: true,
            last: true
        }
    });

    const pendingApiCall = useApiProgress("/api/users?page");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async page => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setUsersState({ ...useState, page: response.data });
        } catch (error) {
            setLoadFailure(true);
        }
    }

    const { content: users, number, last, first } = usersState.page;

    const usersContent = () => {
        if (pendingApiCall) {
            return (
                <Spinner />
            );
        }
        return (
            <>
                <h5 className="card-title">Kullanıcılar</h5>
                <div className="list-group list-group-flush p-3">
                    {users.map((user) => {
                        return <UserListItem user={user} key={user.username} />
                    })}

                </div>
            </>
        );

    };
    return (
        <div>


            <div className="card" style={{ height: "450px" }}>
                <div className="card-body">
                    {usersContent()}
                </div>
            </div>
            { loadFailure && (<div class="alert alert-danger mt-3" role="alert"> Kullanıcılar Yüklenemedi...</div>)}
            <div className="mt-3">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${first == true && "disabled"}`}>
                        <button className="page-link shadow-none" onClick={() => loadUsers(number - 1)}>Previous</button>
                    </li>
                    <li className="page item">
                        <div className="page-link" >{number + 1}</div>
                    </li>
                    <li className={`page-item ${last == true && "disabled"}`}>
                        <button className="page-link shadow-none" onClick={() => loadUsers(number + 1)}>Next</button>
                    </li>
                </ul>
            </div>



        </div>
    );
}

export default UserList;