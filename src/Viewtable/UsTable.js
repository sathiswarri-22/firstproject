import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsTable = ({ deleteUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5002/posts/:uid');
                const fetchedUsers = response.data.data.map(user => ({
                    id: user.id,
                    uid: user.uid,
                    file_upload: user.file_upload,
                    file_type: user.file_type,
                }));
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>postId</th>
                    <th>UserId</th>
                    <th>Files</th>
                    <th>File Types</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.uid}</td>
                        <td>{user.file_upload}</td>
                        <td>{user.file_type}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsTable;
