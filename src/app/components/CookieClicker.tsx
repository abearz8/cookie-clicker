'use client';

import { Cookie } from '../models/Cookie';
import { AutomaticUpgrade } from '../models/AutomaticUpgrade';
import styles from './CookieClicker.module.css';

interface CookieClickerProps {
    cookie: Cookie;
    onUpdate: () => void;
    upgrades: {
        autoclicker: AutomaticUpgrade;
        grandma: AutomaticUpgrade;
        mine: AutomaticUpgrade;
    };
}

export default function CookieClicker({ cookie, onUpdate, upgrades }: CookieClickerProps) {
    const handleClick = () => {
        cookie.click();
        onUpdate();
    };

    const handleUpgrade = () => {
        if (cookie.upgradeCookiesPerClick()) {
            onUpdate();
        }
    };

    const totalCPS = Object.values(upgrades).reduce((sum, upgrade) => 
        sum + upgrade.getTotalCPS(), 0
    );

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <h2><b>Cookies: {cookie.getTotalCookies()}</b></h2>
                <h3>Cookies per click: {cookie.getCookiesPerClick()}</h3>
                <h3>Idle clicks per second: {totalCPS}</h3>
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