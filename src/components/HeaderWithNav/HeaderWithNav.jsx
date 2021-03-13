import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

// No specific CSS for this file, check App.js for all header styles

const HeaderWithNav = (props) => {
    const {showPostSuccess, setAddedPost} = props;
    let history = useHistory();

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Redirects to homepage when canceled */
    const goBackHome = () => {
        ReactGA.event({
            "category": "Submit",
            "action": "User created a new post"
        })
        showPostSuccess();
        history.push("/home");
        setAddedPost(true);
    }

    return (
        <div className="page-header">
            <div class="page-header-logo"><span>kritiq.it</span></div>
            <div class="page-header-back" onClick={goBackHome}><div>post</div></div>
        </div>
    )
}

export default HeaderWithNav;