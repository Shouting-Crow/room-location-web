import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './LoginAndSignUp.css';

function Login({onLogin}) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            const response = await axios.post('http://localhost:8080/api/login', formData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('로그인 성공');
                onLogin(formData.username);
                navigate('/');
            } else {
                console.log('로그인 실패 : ', response.data);
                alert(response.data);
            }
        } catch (error) {
            console.error('로그인 에러 : ', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="아이디"
                    value={formData.username}
                    onChange={(handleChange)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">로그인</button>
                <button type="button" onClick={handleCancel}>취소</button>
                <button type="button" onClick={handleSignUp}>회원가입</button>
            </form>
        </div>
    );
}

export default Login;