'use client';

import { useState, useEffect } from 'react';
import { Cookie } from './models/Cookie';
import { AutomaticUpgrade } from './models/AutomaticUpgrade';
import Upgrade from './components/AutomaticUpgrade';
import CookieClicker from './components/CookieClicker';
import OfflineEarningsPopup from './components/OfflineEarningsPopup';
import { saveGame, loadGame, resetGame, calculateOfflineEarnings } from './utils/gameStorage';
import styles from './page.module.css';

export default function Home() {
  const [cookie] = useState<Cookie>(new Cookie());
  const [upgrades] = useState({
    autoclicker: new AutomaticUpgrade(20, 1),
    grandma: new AutomaticUpgrade(100, 5),
    mine: new AutomaticUpgrade(500, 25)
  });
  const [, setUpdateTrigger] = useState(0);
  const [showOfflinePopup, setShowOfflinePopup] = useState(false);
  const [offlineData, setOfflineData] = useState({ cookies: 0, seconds: 0 });
  const [devMode, setDevMode] = useState(false);
  const [previousSave, setPreviousSave] = useState<any>(null);

  // Load saved game data on component mount
  useEffect(() => {
    const savedData = loadGame();
    if (savedData) {
      // Calculate offline earnings before loading the save
      const offlineCookies = calculateOfflineEarnings(savedData);
      const now = Date.now();
      const secondsOffline = Math.floor((now - savedData.lastSave) / 1000);
      
      // Only show popup if there are significant offline earnings (more than 1 second and some cookies)
      if (secondsOffline > 1 && offlineCookies > 0) {
        setOfflineData({ cookies: offlineCookies, seconds: secondsOffline });
        setShowOfflinePopup(true);
        // Add offline cookies to the saved data
        savedData.cookies += offlineCookies;
      }
      
      cookie.loadFromSave(savedData);
      upgrades.autoclicker.loadFromSave(savedData.upgrades.autoclicker);
      upgrades.grandma.loadFromSave(savedData.upgrades.grandma);
      upgrades.mine.loadFromSave(savedData.upgrades.mine);
      setUpdateTrigger(prev => prev + 1);
    }
  }, []);

  const handleCookieUpdate = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  const handleUpgradePurchase = (upgradeType: keyof typeof upgrades) => {
    const upgrade = upgrades[upgradeType];
    if (upgrade.buyUpgrade(cookie.getTotalCookies(), cookie)) {
      handleCookieUpdate();
    }
  };

  const handleCloseOfflinePopup = () => {
    setShowOfflinePopup(false);
  };

  const toggleDevMode = () => {
    if (!devMode) {
      // Entering dev mode - save current state and set dev values
      const currentState = {
        cookie: {
          cookies: cookie.totalCookies,
          cookiesPerClick: cookie.cookiesPerClick,
          numUpgrades: cookie.numUpgrades,
          multiplier: cookie.multiplier,
          costOfNextUpgrade: cookie.costOfNextUpgrade,
        },
        upgrades: {
          autoclicker: {
            numUpgrades: upgrades.autoclicker.numUpgrades,
            costOfNext: upgrades.autoclicker.costOfNext,
            cpsMultiplier: upgrades.autoclicker.cpsMultiplier,
          },
          grandma: {
            numUpgrades: upgrades.grandma.numUpgrades,
            costOfNext: upgrades.grandma.costOfNext,
            cpsMultiplier: upgrades.grandma.cpsMultiplier,
          },
          mine: {
            numUpgrades: upgrades.mine.numUpgrades,
            costOfNext: upgrades.mine.costOfNext,
            cpsMultiplier: upgrades.mine.cpsMultiplier,
          },
        },
      };
      setPreviousSave(currentState);
      
      // Set dev values
      cookie.totalCookies = 1000000;
      cookie.cookiesPerClick = 1;
      cookie.numUpgrades = 1;
      cookie.multiplier = 1;
      cookie.costOfNextUpgrade = 10;
      
      upgrades.autoclicker.numUpgrades = 0;
      upgrades.autoclicker.costOfNext = 20;
      upgrades.autoclicker.cpsMultiplier = 1;
      
      upgrades.grandma.numUpgrades = 0;
      upgrades.grandma.costOfNext = 100;
      upgrades.grandma.cpsMultiplier = 1;
      
      upgrades.mine.numUpgrades = 0;
      upgrades.mine.costOfNext = 500;
      upgrades.mine.cpsMultiplier = 1;
      
      // Add dev mode background
      document.body.classList.add('dev-mode');
      
      setDevMode(true);
      handleCookieUpdate();
    } else {
      // Exiting dev mode - restore previous save
      if (previousSave) {
        cookie.loadFromSave(previousSave.cookie);
        upgrades.autoclicker.loadFromSave(previousSave.upgrades.autoclicker);
        upgrades.grandma.loadFromSave(previousSave.upgrades.grandma);
        upgrades.mine.loadFromSave(previousSave.upgrades.mine);
        setPreviousSave(null);
      }
      
      // Remove dev mode background
      document.body.classList.remove('dev-mode');
      
      setDevMode(false);
      handleCookieUpdate();
    }
  };

  // Auto-save game every second (disabled in dev mode)
  useEffect(() => {
    if (devMode) return; // Don't save in dev mode
    
    const saveInterval = setInterval(() => {
      saveGame(cookie, upgrades);
    }, 1000);

    return () => clearInterval(saveInterval);
  }, [cookie, upgrades, devMode]);

  // Add cookies per second based on upgrades
  useEffect(() => {
    const interval = setInterval(() => {
      const totalCPS = Object.values(upgrades).reduce((sum, upgrade) => 
        sum + upgrade.getTotalCPS(), 0
      );
      
      if (totalCPS > 0) {
        cookie.addCookies(totalCPS);
        handleCookieUpdate();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upgrades, cookie]);

  return (
    <main>
      <h1 className="game-title">Cookie Clicker</h1>
      <div className={styles.gameContainer}>
        <div className={styles.cookieSection}>
          <CookieClicker 
            cookie={cookie} 
            onUpdate={handleCookieUpdate} 
            upgrades={upgrades}
          />
        </div>
        <div className={styles.upgradesSection}>
          <Upgrade 
            icon="🤖" 
            upgrade={upgrades.autoclicker}
            cookies={cookie.getTotalCookies()}
            onPurchase={() => handleUpgradePurchase('autoclicker')}
          />
          <Upgrade 
            icon="👵" 
            upgrade={upgrades.grandma}
            cookies={cookie.getTotalCookies()}
            onPurchase={() => handleUpgradePurchase('grandma')}
          />
          <Upgrade 
            icon="⛏️" 
            upgrade={upgrades.mine}
            cookies={cookie.getTotalCookies()}
            onPurchase={() => handleUpgradePurchase('mine')}
          />
        </div>
      </div>
      <div className={styles.resetSection}>
        <button 
          className={`${styles.devButton} ${devMode ? styles.active : ''}`}
          onClick={toggleDevMode}
        >
          {devMode ? 'Exit Dev Mode' : 'Dev Mode'}
        </button>
        <button 
          className={styles.resetButton}
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      
      {showOfflinePopup && (
        <OfflineEarningsPopup
          offlineCookies={offlineData.cookies}
          secondsOffline={offlineData.seconds}
          onClose={handleCloseOfflinePopup}
        />
      )}
    </main>
  );
}
