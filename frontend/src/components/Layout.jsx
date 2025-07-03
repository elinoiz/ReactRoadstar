import React, { useEffect, useContext, useState, useRef } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import './styles/main.css';

import logoR from './images/logoR.png';
import iconLoop from './images/iconLoop.png';
import Avatar from './images/Avatar.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import icon5 from './images/icon5.png';
import icon6 from './images/icon6.png';
import icon7 from './images/icon7.png';
import { UserContext } from '../UserContext';

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // Закрыть кнопку "Выйти", если клик вне аватара
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowLogout(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    console.log('Search:', e.target.value);
  };

  const handleCreateAdClick = () => {
    navigate('/main/create-ad');
  };

  return (
    <div>
      <div className="header">
        <Link to="/main">
          <img src={logoR} alt="Logo" className="logo" />
        </Link>

        <div className="hat">
          <div className="search-box">
            <input type="text" className="search-input" placeholder="Search..." onChange={handleSearch} />
            <img src={iconLoop} alt="Loop" className="search-icon" />
          </div>

          <div className="roadstar">Roadstar</div>

          <div className="user-info" ref={avatarRef} style={{ position: 'relative' }}>
            {user ? (
              <>
                <span className="username">{user.name}</span>
                <img
                  src={user.photo || Avatar}
                  alt="Avatar"
                  className="avatar"
                  onClick={() => setShowLogout((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                />
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    style={{
                      position: 'absolute',
                      top: '60px',
                      right: 0,
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
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                style={{
                  padding: '5px 10px',
                  cursor: 'pointer',
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="left-nav-block">
        <ul className="nav-list">
          <li><img src={icon1} alt="icon1" /> Мои объявления</li>
          <li><img src={icon2} alt="icon2" /> Сообщения</li>
          <li><img src={icon3} alt="icon3" /> Поддержка</li>
          <li><img src={icon4} alt="icon4" /> Мои ставки</li>
          <li><img src={icon5} alt="icon5" /> Контакты</li>
          <li onClick={handleCreateAdClick}><img src={icon6} alt="icon6" /> Создать объявление</li>
          <li><img src={icon7} alt="icon7" /> Настройки</li>
        </ul>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
