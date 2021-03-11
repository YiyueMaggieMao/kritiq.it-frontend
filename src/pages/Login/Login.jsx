import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import LoginHeader from '../../components/LoginHeader/LoginHeader';
import usernameIcon from '../../img/Username.svg';
import passwordIcon from '../../img/Password.svg';

import './Login.css';

const Login = (props) => {
  const { setUserData } = props;
  let history = useHistory();

  /* Google Analytics stuff */
  const trackingId = "UA-191938493-1";
  ReactGA.initialize(trackingId);

  /* Redirects to home page upon successful login */
  const redirectToHome = () => {
    ReactGA.event({
      category: "Log in",
      action: "User did Wizard of Oz Login"
    })
    history.push("/home");
  };

  /* Redirects to sign up upon clicking the sign up text */
  const redirectToSignup = () => {
    ReactGA.event({
      category: "Redirect",
      action: "User redirected to Signup from Login"
    })
    history.push("/signup");
  }

  /* Callback for Facebook Login */
  const loginWithFacebook = (response) => {
    ReactGA.event({
      category: "Redirect",
      action: "User used Facebook Login"
    })
    setUserData({ "name": response.name, "picture": response.picture.data.url });
    redirectToHome();
  }

  /* Renders the actual content */
  return (
    <div className="login">
      <LoginHeader />
      <form className="login-form" onSubmit={redirectToHome}>
        <div className="label-input">
          <label>Username</label>
          <div className="icon-input-container">
            <img className="icon" height="16px" src={usernameIcon} />
            <input className="input-field" type="text" name="username" required />
          </div>
        </div>
        <div className="label-input">
          <label>Password</label>
          <div className="icon-input-container">
            <img className="icon" height="20px" src={passwordIcon} />
            <input className="input-field" type="password" name="password" required />
          </div>
        </div>
        <input className="login-button" type="submit" value="Login" />
      </form>
      <p className="bottom-text">
        Are you new? <span className="create-account-text" onClick={redirectToSignup}><a>Create an Account</a></span>
      </p>
      <div className="or-div">
        <span className="or-div-line"><hr /></span>
        <span className="or-div-text">Or</span>
        <span className="or-div-line"><hr /></span>
      </div>
      <div className="facebook-login-container">
        <FacebookLogin
          appId="151562900161434"
          autoLoad={true}
          fields="name,picture.type(large)"
          scope="public_profile,user_friends"
          callback={loginWithFacebook}
          type="continue_with"
          icon="fa-facebook"
        />
      </div>
    </div>
  )
}

export default Login;
