import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import MenuBar from './components/MenuBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import SinglePost from './pages/SinglePost';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<SinglePost/>} />
            <Route exact path='/' element={<AuthRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
