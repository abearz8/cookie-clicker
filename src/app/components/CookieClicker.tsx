'use client';

import { useState, useEffect } from 'react';
import { Cookie } from '../models/Cookie';
import styles from './CookieClicker.module.css';

export default function CookieClicker() {
    const [cookie, setCookie] = useState<Cookie>(new Cookie());
    const [score, setScore] = useState<number>(0);
    const [cookiesPerClick, setCookiesPerClick] = useState<number>(1);

    const handleClick = () => {
        cookie.click();
        setScore(cookie.getTotalCookies());
        setCookiesPerClick(cookie.getCookiesPerClick());
    };

    const handleUpgrade = () => {
        const upgradeCost = cookiesPerClick * 10;
        if (cookie.upgradeCookiesPerClick(upgradeCost)) {
            setScore(cookie.getTotalCookies());
            setCookiesPerClick(cookie.getCookiesPerClick());
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <h2>Cookies: {score}</h2>
                <h3>Cookies per click: {cookiesPerClick}</h3>
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
                disabled={score < cookiesPerClick * 10}
            >
                Upgrade ({cookiesPerClick * 10} cookies)
            </button>
        </div>
    );
} 