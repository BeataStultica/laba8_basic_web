import './App.css';
import Home from './components/Home';
import Authorization from './components/Authorization';
import Account from './components/Account';
import Singup from './components/Signup/Signup';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function App() {
  const [isLogin, setData] = useState(['-']);
  useEffect(() => {
    const getLogin = async () => {
      fetch('http://192.168.56.1:3001', {
        withCredentials: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }

      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setData(res.user.name);
        });

    };
    getLogin();
  });
  return (<Router>
    <div className='content'>
      {isLogin ? (
        <div className="header">
          <Link className="links" to="/user" >Користувач {isLogin}</Link>
          <Link className="links" to="/" >Головна сторінка</Link>
          <button onClick={() => {
            fetch('http://192.168.56.1:3001/logout',{
              withCredentials: true,
              credentials: 'include',});
            window.location.pathname = '/'
          }}>Вихід</button>
        </div>
      ) : (
        ''
      )}
      <Routes>
        {isLogin ? (

          <Route index path="/" element={<Home />} />

        ) : (
          <Route path="/" element={<Authorization />} />
        )}
        <Route path="/user" element={<Account />} />
        <Route path="/registration" element={<Singup />} />
      </Routes>
    </div>
  </Router>
  );

}

export default App;
