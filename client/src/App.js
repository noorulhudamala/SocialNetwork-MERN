import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';


import 'semantic-ui-css/semantic.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Router>
  );
}

export default App;
