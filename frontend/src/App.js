import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Layout from './components/Layout';
import CreateAd from './components/CreateAd';
import { UserProvider } from './UserContext';
import MainPage from './components/MainPage';
import AdDetail from './components/AdDetail';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.className = '';
    if (location.pathname === '/') {
      document.body.classList.add('home-page');
    } else if (location.pathname === '/register') {
      document.body.classList.add('register-page');
    } else if (location.pathname === '/login') {
      document.body.classList.add('login-page');
    } else if (location.pathname.startsWith('/main')) {
      document.body.classList.add('main-page');
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="create-ad" element={<CreateAd />} />
        <Route path="ad/:ad_id" element={<AdDetail />} />
        
        <Route path="my-ads" element={<MyAdd />} />
      </Route>
    </Routes>
  );
};

const Root = () => (
  <UserProvider>
    <Router>
      <AppContent />
    </Router>
  </UserProvider>
);

export default Root;
