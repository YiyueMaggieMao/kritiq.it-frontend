import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Login from './pages/Login/Login';

// Components
import Navbar from './components/Navbar/Navbar';

// Style
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/" to="/login" exact></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/create-post" component={CreatePost}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
