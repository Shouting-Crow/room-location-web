import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {useEffect, useState} from "react";
import axios from "axios";
import RoomStructure from "./components/RoomStructure";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [roomShape, setRoomShape] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios.post('http://localhost:8080/api/check-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                    if (response.data.username) {
                        setIsLoggedIn(true);
                        setUsername(response.data.username);
                    }
            })
            .catch(error => {
                console.error('세션 검증 실패: ', error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('token');
    }

    const handleNextStep = (shape) => {
        setRoomShape(shape);
    };

  return (
      <Router>
          <div className="App">
              <NavBar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout}/>
              <main>
                  <Routes>
                      <Route path="/" element={<h1>홈 페이지 내용</h1>}/>
                      <Route path="/signup" element={<SignUp />}/>
                      <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                      <Route path="/room-create" element={<RoomStructure onNext={handleNextStep} />}/>
                  </Routes>
              </main>
          </div>
      </Router>
  );

}

export default App;
