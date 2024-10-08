import React from 'react';
import './main.css';
import Game from './Game.png';
import Cards from './cards.jsx';
import Card2 from './card2.jsx'

const main = () => {
    return (
        <div className="main">
            <div className="header">
                <div className="def">
                    <div className="heads">
                        <h3> "I'm not addicted to gaming, I'm committed to it."</h3>
                        <p>Discover the latest game giveaways, access free games, stay updated with gaming news, and explore top releases. Our site offers a comprehensive hub for all things gaming, keeping you informed and entertained with fresh content and exciting opportunities.</p>
                    </div>
                </div>
                <div className="img">
                    <img src={Game} alt="hey" />
                </div>
            </div>
            <div className="line"></div>
            <div className="rest">
                    <Cards />

                    <div className="line1"></div>
                    <div className="content">
                        <Card2/>
                    </div>


            </div>
        </div>
    )
}

export default main
