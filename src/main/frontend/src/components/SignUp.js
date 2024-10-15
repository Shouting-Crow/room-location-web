import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phoneNumber: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/register', formData);
            console.log('User registered successfully: ', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error registering user: ', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="아이디"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="전화번호"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button type="submit">회원가입</button>
                <button type="button" onClick={handleCancel}>취소</button>
            </form>
        </div>

    );
}

export default SignUp;