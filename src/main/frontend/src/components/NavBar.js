import React from 'react';
import './NavBar.css';
import {Link, useNavigate} from 'react-router-dom';

function NavBar({isLoggedIn, username, onLogout}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

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