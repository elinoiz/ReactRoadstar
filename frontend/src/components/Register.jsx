import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from './images/logo.png';
import userIcon from './images/user.png';
import padlock from './images/padlock 1.png';
import kid from './images/kid.png';
import './styles/register.css';
import { UserContext } from '../UserContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('user_name', formData.login);
    formDataToSend.append('user_pass', formData.password);

    // 1. Регистрируем пользователя
    await axios.post('https://reactroadstar-3.onrender.com/register/', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 2. Автоматически логиним пользователя после регистрации
    const loginResponse = await axios.post('https://reactroadstar-3.onrender.com/login/', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Login response data:', loginResponse.data);

    if (loginResponse.data && loginResponse.data.success) {
      const userData = {
        user_id: loginResponse.data.id, // убедитесь, что сервер возвращает поле `id` или `user_id`
        name: formData.login,
        isAuthenticated: true,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/main');
    } else {
      throw new Error('Login after registration failed');
    }
  } catch (error) {
    console.error(error);
    alert('Registration failed!');
  }
};

  return (
    <div className="container">
      <div className="left-side">
        <img src={logo1} alt="Logo" className="logo" />
        <div className="signup-text-left">
          <p className="signup-line1-left">Sign Up</p>
          <p className="signup-line2-left">
            Enter your name and password to register
          </p>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <img src={userIcon} alt="User" className="icon" />
              <label htmlFor="login">Login:</label>
              <br />
              <input
                type="text"
                id="login"
                name="login"
                className="line-form"
                value={formData.login}
                onChange={handleChange}
              />
              <br />
            </div>
            <div className="input-group">
              <img src={padlock} alt="Padlock" className="icon" />
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                className="line-form"
                value={formData.password}
                onChange={handleChange}
              />
              <br />
            </div>
            <br />
            <input type="submit" value="Registration" />
          </form>
        </div>
      </div>
      <div className="right-side">
        <img src={kid} alt="Kid" className="kid-image" />
        <div className="signup-text">
          <p className="signup-line1">Sign Up to name</p>
          <p className="signup-line2">and enjoy</p>
        </div>
      </div>
      
    </div>
  );
};

export default RegisterPage;
