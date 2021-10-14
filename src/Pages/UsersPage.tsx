import React from 'react';
import axios from "axios";
import { baseURL } from "../Consts";
import { User } from "../Models/User";
function Users() {
    const [users, setUsers] = React.useState<Array<User>>([]);

    React.useEffect(() => {
        axios.get(baseURL + "/users").then((response) => {
            setUsers(response.data);
        });
    }, []);

    return <h1>{users[0]?.userName}</h1>
}

export default Users;
