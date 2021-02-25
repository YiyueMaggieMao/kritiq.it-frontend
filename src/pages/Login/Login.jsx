import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import LoginHeader from '../../components/LoginHeader/LoginHeader';
import usernameIcon from '../../img/Username.svg';
import passwordIcon from '../../img/Password.svg';

import './Login.css';

const Login = () => {
  let history = useHistory();

  const redirectToHome = () => {
      history.push("/home");
  };

  return (
        <div className="login">
          <LoginHeader/>
          <form className="login-form" onSubmit={redirectToHome}>
            <div className = "label-input">
              <label>Username</label>
              <div className="icon-input-container">
                <img className= "icon" height="16px"src={usernameIcon}/>
                <input className="input-field"type="text" name="username" required/>
              </div>
            </div>
            <div className = "label-input">
              <label>Password</label>
              <div className="icon-input-container">
                <img className="icon" height="20px" src={passwordIcon}/>
                <input className="input-field" type="password" name="password" required/>
              </div>
            </div>
            <input className = "login-button" type="submit" value="Login" />
          </form>
          <p className="bottom-text">Are you new? <span className="create-account-text"><a>Create an Account</a></span></p>
        </div>
    )
}

export default Login;
