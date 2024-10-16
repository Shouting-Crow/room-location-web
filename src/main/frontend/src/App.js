import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {useState} from "react";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('token');
    }

  return (
      <Router>
          <div className="App">
              <NavBar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout}/>
              <main>
                  <Routes>
                      <Route path="/" element={<h1>홈 페이지 내용</h1>}/>
                      <Route path="/signup" element={<SignUp />}/>
                      <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                  </Routes>
              </main>
          </div>
      </Router>
  );

}

export default App;
