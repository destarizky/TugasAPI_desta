import React, { useState, useEffect } from 'react';
import { FaCircleUser, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // 🔧 indikator login sukses

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      navigate('/search');
    }
  }, [loginSuccess, navigate]);

  const handleClick = async (e) => { // Integrasi dengan endpoint login backend
    e.preventDefault();
    setClicked(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) { // Menyimpan token dan API Key dari Backend
        localStorage.setItem("token", data.token); // Menyimpan JWT Token
        localStorage.setItem("apiKey", data.apiKey); // Menyimpan API Key
        alert("Login berhasil!");
        setLoginSuccess(true);
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan pada login");
      console.error(err);
    }

    setClicked(false);
  };

  return (
    <div className='wrapper'>
      <form>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type="email"
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaCircleUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type="password"
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className={clicked ? 'clicked' : ''}
          onClick={handleClick}
        >Login</button>

        <div className="login-register">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
