import React from 'react';
import {useHistory} from 'react-router-dom';

// Icons used for nav
import homeIcon from '../../img/House.png';
import createIcon from '../../img/PlusCircle.png';
import searchIcon from '../../img/MagnifyingGlass.png';

// Style
import './Navbar.css';

const Navbar = () => {
    let history = useHistory();

    /* Redirect functions */
    const redirectToHome = () => {
        history.push("/home");
    };

    const redirectToCreate = () => {
        history.push("/create-post");
    }

    /* Content rendering */
    return (
        <div className="bottom-nav">
            <span className="nav-button" onClick={redirectToHome}><img src={homeIcon}/></span>
            <span className="nav-button" onClick={redirectToCreate}><img src={createIcon}/></span>
            <span className="nav-button"><img src={searchIcon}/></span>
        </div>
    )
}

export default Navbar;