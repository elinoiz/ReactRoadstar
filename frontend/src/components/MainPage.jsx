import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/main.css';
import { UserContext } from '../UserContext';
import AdCard from './AdCard';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { user, logout } = useContext(UserContext); // Получаем logout из контекста
  const [ads, setAds] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  // Реф для клика вне меню выхода
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://reactroadstar-3.onrender.com/get_ad');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  // Закрытие меню, если кликнули вне блока профиля
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // очистка user из контекста и localStorage
    navigate('/login'); // редирект на страницу логина
  };

  return (
    <div className="main-content">
      {/* Блок профиля */}
      {user && user.isAuthenticated && (
        <div className="profile-block" ref={profileRef} style={{ position: 'relative', marginBottom: '20px' }}>
          <img
            src={user.photo || '/default-profile.png'} // у вас может быть поле photo, или подставьте дефолт
            alt="User Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setShowLogout(!showLogout)}
          />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{user.name}</span>

          {showLogout && (
            <button
              onClick={handleLogout}
              style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                padding: '5px 10px',
                cursor: 'pointer',
                background: '#ff4d4f',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Выйти
            </button>
          )}
        </div>
      )}

      {/* Список объявлений */}
      <div className="ads-container">
        {ads.map((ad) => (
          <AdCard key={ad.ad_id} ad_id={ad.ad_id} photo={ad.photo} title={ad.title} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
