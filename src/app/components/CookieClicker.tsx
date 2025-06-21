'use client';

import { Cookie } from '../models/Cookie';
import styles from './CookieClicker.module.css';

interface CookieClickerProps {
    cookie: Cookie;
    onUpdate: () => void;
}

export default function CookieClicker({ cookie, onUpdate }: CookieClickerProps) {
    const handleClick = () => {
        cookie.click();
        onUpdate();
    };

    const handleUpgrade = () => {
        if (cookie.upgradeCookiesPerClick()) {
            onUpdate();
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