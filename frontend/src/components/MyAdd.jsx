import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './styles/myAdd.css';

const MyAdd = () => {
  const { user } = useContext(UserContext);
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyAds = async () => {
      try {
        const response = await axios.get(`https://reactroadstar-3.onrender.com/get_all_ads_by_user?user_id=${user.id}`);
        setMyAds(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user, navigate]);

  const handleDeleteAd = async (adId) => {
    if (window.confirm('Вы уверены, что хотите удалить это объявление?')) {
      try {
        await axios.delete(`https://reactroadstar-3.onrender.com/delete_ad/${adId}`);
        setMyAds(myAds.filter(ad => ad.ad_id !== adId));
        alert('Объявление успешно удалено');
      } catch (error) {
        console.error('Ошибка при удалении объявления:', error);
        alert('Не удалось удалить объявление');
      }
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (myAds.length === 0) {
    return <div className="no-ads">У вас пока нет объявлений</div>;
  }

  return (
    <div className="my-ads-container">
      <h2>Мои объявления</h2>
      <div className="ads-grid">
        {myAds.map(ad => (
          <div key={ad.ad_id} className="ad-card">
            {ad.photo && (
              <img 
                src={`data:image/jpeg;base64,${ad.photo}`} 
                alt={ad.title} 
                className="ad-photo"
              />
            )}
            <div className="ad-details">
              <h3>{ad.title}</h3>
              <p>Город: {ad.city}</p>
              <p>Категория: {ad.category}</p>
              <p>Начальная цена: {ad.start_price} ₽</p>
              <p>{ad.description}</p>
            </div>
            <div className="ad-actions">
              <button 
                onClick={() => navigate(`/main/ad/${ad.ad_id}`)}
                className="view-button"
              >
                Просмотреть
              </button>
              <button 
                onClick={() => handleDeleteAd(ad.ad_id)}
                className="delete-button"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAdd;
