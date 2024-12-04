import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ addUser }) => {
    const initialFormState = { name: "", email: "", password: "" };
    const [user, setUser] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user.name || !user.email || !user.password) return;

        try {
            const response = await axios.post('http://localhost:5002/user/register', user);
            addUser(response.data);
            setUser(initialFormState);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleInputChange} />
            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} />
            <label>Password</label>
            <input type="password" name="password" value={user.password} onChange={handleInputChange} />
            <button>Add User</button>
        </form>
    );
};

export default Register;
