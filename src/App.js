import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import CreatePost from './pages/CreatePost/CreatePost';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// Style
import './App.css';

function App() {
  const [userData, setUserData] = useState({});
  const [addedPost, setAddedPost] = useState(false);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/" to="/login" exact></Redirect>
          <Route path="/login" component={()=><Login setUserData={setUserData}/>}></Route>
          <Route path="/signup" component={()=><Signup setUserData={setUserData}/>}></Route>
          <Route path="/home" 
            component={()=><Home userData={userData} showSearchBar={false} addedPost={addedPost}/>}>
          </Route>
          <Route path="/search" 
            component={()=><Home userData={userData} showSearchBar={true} addedPost={addedPost}/>}>
          </Route>
          <Route path="/profile" component={()=><Profile userData={userData}/>}></Route>
          <Route path="/edit-profile" 
            component={()=><EditProfile userData={userData} setUserData={setUserData}/>}>
          </Route>
          <Route path="/create-post" 
            component={()=> <CreatePost userData={userData} setAddedPost={setAddedPost}/>}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
