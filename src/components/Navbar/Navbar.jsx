import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

// Icons used for nav
import homeIcon from '../../img/House.png';
import createIcon from '../../img/PlusCircle.png';
import searchIcon from '../../img/MagnifyingGlass.png';

// Style
import './Navbar.css';

const Navbar = () => {
    let history = useHistory();

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Redirect functions */
    const redirectToHome = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected to Home from Navbar"
        })
        history.push("/home");
    };

    const redirectToCreate = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected to CreatePost from Navbar"
        })
        history.push("/create-post");
    }

    const redirectToSearch = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected to CreatePost from Navbar"
        })
        history.push("/search");
    }

    /* Content rendering */
    return (
        <div className="bottom-nav">
            <span className="nav-button" onClick={redirectToHome}><img src={homeIcon} /></span>
            <span className="nav-button" onClick={redirectToCreate}><img src={createIcon} /></span>
            <span className="nav-button" onClick={redirectToSearch}><img src={searchIcon} /></span>
        </div>
    )
}

export default Navbar;