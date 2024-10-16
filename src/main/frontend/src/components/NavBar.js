import React, {useEffect, useState} from 'react';
import './NavBar.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function NavBar({isLoggedIn, username, onLogout}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         axios.get('http://localhost:8080/api/check-session', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //             .then(response => {
    //                 if (response.data.loggedIn) {
    //                     setIsLoggedIn(true);
    //                     setUsername(response.data.username);
    //                 } else {
    //                     setIsLoggedIn(false);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('세션 체크 에러 : ', error);
    //                 setIsLoggedIn(false);
    //             });
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    // }, []);
    //
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setIsLoggedIn(false);
    //     navigate('/');
    // };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">홈페이지</Link>
            </div>
            <div className="menu">
                {isLoggedIn ? (
                    <>
                        <span>{username}</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;