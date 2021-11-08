import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';


import MenuBar from './components/MenuBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';


import 'semantic-ui-css/semantic.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="ui container">
        <MenuBar />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
