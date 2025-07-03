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
        const registerResponse = await axios.post('https://reactroadstar-3.onrender.com/register/', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(registerResponse.data);
        
        // 2. Автоматически логиним пользователя после регистрации
        const loginResponse = await axios.post('https://reactroadstar-3.onrender.com/login/', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const userData = {
            id: loginResponse.data.user_id,
            name: formData.login,
            isAuthenticated: true
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/main');
    } catch (error) {
        console.error(error);
        alert('Registration failed!');
    }
  };

  return (
    <div className="container">
      {/* Остальной JSX остается без изменений */}
    </div>
  );
};

export default RegisterPage;
