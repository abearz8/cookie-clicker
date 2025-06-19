'use client';

import { useState } from 'react';
import { Cookie } from '../models/Cookie';
import styles from './CookieClicker.module.css';

export default function CookieClicker() {
    const [cookie] = useState<Cookie>(new Cookie());
    const [, forceUpdate] = useState({});

    const handleClick = () => {
        cookie.click();
        forceUpdate({});
    };

    const handleUpgrade = () => {
        if (cookie.upgradeCookiesPerClick()) {
            forceUpdate({});
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <h2><b>Cookies: {cookie.getTotalCookies()}</b></h2>
                <h3>Cookies per click: {cookie.getCookiesPerClick()}</h3>
            </div>
            
            <button 
                className={styles.cookieButton}
                onClick={handleClick}
            >
                🍪
            </button>

            <button 
                className={styles.upgradeButton}
                onClick={handleUpgrade}
                disabled={cookie.getTotalCookies() < cookie.getCostOfNextUpgrade()}
            >
                Upgrade ({cookie.getCostOfNextUpgrade()} cookies)
            </button>
        </div>
    );
} 