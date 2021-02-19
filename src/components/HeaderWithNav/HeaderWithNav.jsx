import React from 'react';
import {useHistory} from 'react-router-dom';

// No specific CSS for this file, check App.js for all header styles

const HeaderWithNav = () => {
    let history = useHistory();

    /* Redirects to homepage when canceled */
    const goBackHome = () => {
        history.push("/home");
    }

    return (
        <div className="page-header">
            <div class="page-header-logo"><span>kritiq.it</span></div>
            <div class="page-header-back" onClick={goBackHome}><div>cancel</div></div>
        </div>
    )
}

export default HeaderWithNav;