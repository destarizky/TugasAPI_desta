import React, { useState } from 'react';
import { FaCircleUser, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    setClicked(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("apiKey", data.apiKey);
        alert("Login berhasil!");
        // Redirect bisa ditambahkan di sini kalau perlu
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan pada login");
      console.error(err);
    }

    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  const navigate = useNavigate();
  navigate('/search')

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
