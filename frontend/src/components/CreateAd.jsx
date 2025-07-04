  import React, { useState, useEffect, useRef, useContext } from 'react';
import './styles/create.css';
import { UserContext } from '../UserContext';

const CreateAd = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    start_price: '',
    city: '',
    description: '',
    photo: null,
  });

  const photoInputRef = useRef(null);
  const uploadBoxRef = useRef(null);

  const russianCities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа',
    'Красноярск',
    'Пермь',
    'Воронеж',
    'Волгоград'
  ];

  const categories = [
    'Недвижимость',
    'Транспорт',
    'Электроника',
    'Одежда',
    'Мебель',
    'Спорттовары',
    'Книги',
    'Другое'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'start_price' ? parseInt(value, 10) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (uploadBoxRef.current) {
          uploadBoxRef.current.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.objectFit = 'cover';
          uploadBoxRef.current.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    }

    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.photo) {
      alert('Пожалуйста, загрузите фотографию.');
      return;
    }

    if (!user || !user.user_id) {
      alert('Пользователь не авторизован');
      return;
    }

  
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    form.append('user_id', user.user_id);

   
  
    try {
      const response = await fetch('https://reactroadstar-3.onrender.com/createAd', {
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('Объявление успешно создано!');
      } else {
        alert('Ошибка при создании объявления.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при создании объявления.');
    }
  };

  useEffect(() => {
    const handleUploadBoxClick = () => {
      if (photoInputRef.current) {
        photoInputRef.current.click();
      }
    };

    const uploadBox = uploadBoxRef.current;
    if (uploadBox) {
      uploadBox.addEventListener('click', handleUploadBoxClick);
    }

    return () => {
      if (uploadBox) {
        uploadBox.removeEventListener('click', handleUploadBoxClick);
      }
    };
  }, []);

  return (
    <form className="create-message" onSubmit={handleSubmit}>
      <div className="form-left">
        <div className="form-group">
          <div className="image-upload">
            <label htmlFor="photo">
              <div className="upload-box" ref={uploadBoxRef}>
                <span className="upload-icon">+</span>
              </div>
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={photoInputRef}
            />
          </div>
        </div>
      </div>

      <div className="form-right">
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input
            type="text"
            id="title"
            name="title"
            size="30"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="start_price">Начальная ставка (₽):</label>
          <input
            type="number"
            id="start_price"
            name="start_price"
            min="0"
            value={formData.start_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Город:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Выберите город</option>
            {russianCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            cols="30"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <input type="submit" value="Создать объявление" />
        </div>
      </div>
    </form>
  );
};

export default CreateAd;
