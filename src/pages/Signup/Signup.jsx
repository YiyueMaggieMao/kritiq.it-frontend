import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import LoginHeader from '../../components/LoginHeader/LoginHeader';
import usernameIcon from '../../img/Username.svg';
import passwordIcon from '../../img/Password.svg';

const Signup = () => {

    let history = useHistory();

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Redirects to home upon successful signup */
    const redirectToHome = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected from Signup to Home"
        })
        history.push("/home");
    }

    /* Redirects to Login page upon clicking the login text */
    const redirectToLogin = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected from Signup to Login"
        })
        history.push("/login");
    }

    /* Renders page content */
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
                <input className="login-button" type="submit" value="Sign Up" />
            </form>
            <p className="bottom-text">
                Already a user? <span className="create-account-text" onClick={redirectToLogin}><a>Log In</a></span>
            </p>
        </div>
    )
}

export default Signup;