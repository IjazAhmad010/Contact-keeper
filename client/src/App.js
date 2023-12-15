import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layouts/Alerts';

import ContactState from './context/contact/ContactState';
import AuthtState from './context/auth/AuthState';
import AlertState from './context/alert/Alertstate';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthtState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/'
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthtState>
  );
};

export default App;
