import React, { useEffect, useContext, useState } from 'react';
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
  const { user, setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleSearch = (e) => {
    console.log('Search:', e.target.value);
  };

  const handleCreateAdClick = () => {
    navigate('/main/create-ad');
  };

  const toggleLogout = (e) => {
    e.stopPropagation();
    setShowLogout(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Закрывать меню при клике вне его
  useEffect(() => {
    const handleClickOutside = () => {
      if (showLogout) {
        setShowLogout(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLogout]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="header">
        <Link to="/main">
          <img src={logoR} alt="Logo" className="logo" />
        </Link>

        <div className="hat">
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <img src={iconLoop} alt="Loop" className="search-icon" />
          </div>

          <div className="roadstar">Roadstar</div>

          <div style={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            minWidth: '150px',
            justifyContent: 'flex-end'
          }}>
            {user ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                position: 'relative',
                cursor: 'pointer'
              }} onClick={toggleLogout}>
                <span style={{ 
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '120px'
                }}>{user.name}</span>
                <img
                  src={Avatar}
                  alt="Avatar"
                  style={{ 
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                {showLogout && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 5px)',
                      right: 0,
                      padding: '6px 14px',
                      backgroundColor: '#ff4d4f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      boxShadow: '0 2px 6px rgba(255, 77, 79, 0.4)',
                      transition: 'background-color 0.3s ease',
                      zIndex: 100,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d9363e')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ff4d4f')}
                  >
                    Выйти
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginRedirect}
                style={{
                  padding: '6px 16px',
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 6px rgba(24, 144, 255, 0.4)',
                  transition: 'background-color 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#096dd9')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1890ff')}
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
