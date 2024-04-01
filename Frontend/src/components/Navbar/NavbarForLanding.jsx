import styles from './Navbar.css'
import React, { useState } from 'react';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`navbar ${isOpen ? 'open' : ''}`}>



            <div className={`TitleOfPlatforms ${isOpen ? 'open' : ''}`}>

                <div id='Before600px' className="TitleOfPlatform">
                    <div id="name1">MOVIE</div>
                    <div id="name2">PLAY</div>
                </div>

                <div id='After600px' className="TitleOfPlatform">
                    <div id="name1">M</div>
                    <div id="name2">P</div>
                </div>

            </div>



            <button id='hambutton' className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </button>



            <div className={`Navigation ${isOpen ? 'open' : ''}`}>

                <div className={`NavigatingOptions ${isOpen ? 'open' : ''}`}>
                    <li><a href="">Home</a></li>
                    <li><a href="">Movies</a></li>
                    <li><a href="">Series</a></li>
                </div>

            </div>




            <div className={`Searchcontainer ${isOpen ? 'open' : ''}`}>

                <div className={`SearchBar ${isOpen ? 'open' : ''}`}>
                    <button id='searchbutton'></button>
                    {/* Add Login/Signup butoon here */}
                </div>

            </div>


        </div>
    );
}

export default Navbar;
