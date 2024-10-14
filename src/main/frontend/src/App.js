import {useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/message')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
      <div className="App">
        <h1>React, Spring Boot 통신 확인</h1>
        <p>{message ? message : '로딩 중'}</p>
      </div>
  );

}

export default App;
