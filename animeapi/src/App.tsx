import React,{ useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://utan.php.xdomain.jp/animeapi/api.php?when=2021/2');
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  
  console.log(posts);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
