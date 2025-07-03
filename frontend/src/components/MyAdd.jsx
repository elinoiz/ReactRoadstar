import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './styles/myAdd.css';

const MyAdd = () => {
  const { user } = useContext(UserContext);
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyAds = async () => {
      try {
        console.log('Fetching ads for user ID:', user.id); // Логируем ID пользователя
        const response = await axios.get(`https://reactroadstar-3.onrender.com/get_all_ads_by_user`, {
          params: { user_id: user.id }
        });
        console.log('API Response:', response.data); // Логируем ответ
        if (!response.data) {
          throw new Error('Пустой ответ от сервера');
        }
        setMyAds(response.data);
      } catch (error) {
        console.error('Полная ошибка:', error.response || error); // Подробное логирование
        setError(`Ошибка загрузки: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user, navigate]);

  // ... остальной код компонента (handleDeleteAd и render) ...
};

export default MyAdd;
