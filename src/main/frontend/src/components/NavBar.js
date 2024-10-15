import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">방배치</Link>
            </div>
            <div className="menu">
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
            </div>
        </nav>
    )
}

export default NavBar;