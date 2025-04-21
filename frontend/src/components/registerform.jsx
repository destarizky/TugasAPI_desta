import React, { useState } from 'react';
import { FaCircleUser, FaLock, FaEnvelope } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (password !== confirmPassword) {
      alert("Password tidak cocok");
      setClicked(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("apiKey", data.apiKey); // Simpan apiKey langsung
        alert("Registrasi berhasil!");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat registrasi");
      console.error(err);
    }

    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  return (
    <div className='wrapper'>
      <form>
        <h1>Register</h1>
        <div className='input-box'>
          <input
            type="text"
            placeholder='Username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaCircleUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type="email"
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className='icon' />
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
        <div className='input-box'>
          <input
            type="password"
            placeholder='Confirm Password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>
        <button
          type="submit"
          className={clicked ? 'clicked' : ''}
          onClick={handleClick}
        >Register</button>
        <div className="login-register">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
