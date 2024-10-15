import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {

  return (
      <Router>
          <div className="App">
              <NavBar/>
              <main>
                  <Routes>
                      <Route path="/" element={<h1>홈 페이지 내용</h1>}/>
                      <Route path="/signup" element={<SignUp />}/>
                  </Routes>
              </main>
          </div>
      </Router>
  );

}

export default App;
