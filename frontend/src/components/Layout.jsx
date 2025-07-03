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
    <div>
      <div className="header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Link to="/main">
          <img src={logoR} alt="Logo" style={{ height: '40px' }} />
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          flex: 1,
          justifyContent: 'flex-end',
          maxWidth: '800px'
        }}>
          <div style={{ 
            position: 'relative',
            flex: 1,
            maxWidth: '400px'
          }}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '8px 15px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                outline: 'none'
              }}
            />
            <img src={iconLoop} alt="Search" style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              height: '16px'
            }} />
          </div>

          <div style={{ 
            fontWeight: 'bold',
            fontSize: '18px',
            whiteSpace: 'nowrap'
          }}>
            Roadstar
          </div>

          <div style={{ 
            minWidth: '120px',
            display: 'flex',
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
                  maxWidth: '100px'
                }}>
                  {user.name}
                </span>
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

      <div style={{
        position: 'fixed',
        left: 0,
        top: '60px',
        bottom: 0,
        width: '200px',
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        borderRight: '1px solid #eee'
      }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon1} alt="icon1" style={{ width: '20px' }} /> Мои объявления
          </li>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon2} alt="icon2" style={{ width: '20px' }} /> Сообщения
          </li>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon3} alt="icon3" style={{ width: '20px' }} /> Поддержка
          </li>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon4} alt="icon4" style={{ width: '20px' }} /> Мои ставки
          </li>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon5} alt="icon5" style={{ width: '20px' }} /> Контакты
          </li>
          <li 
            onClick={handleCreateAdClick}
            style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img src={icon6} alt="icon6" style={{ width: '20px' }} /> Создать объявление
          </li>
          <li style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src={icon7} alt="icon7" style={{ width: '20px' }} /> Настройки
          </li>
        </ul>
      </div>

      <div style={{
        marginLeft: '200px',
        padding: '20px',
        marginTop: '60px'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
