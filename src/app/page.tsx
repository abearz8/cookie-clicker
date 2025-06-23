'use client';

import { useState, useEffect } from 'react';
import { Cookie } from './models/Cookie';
import Upgrade from './components/AutomaticUpgrade';
import CookieClicker from './components/CookieClicker';

export default function Home() {
  const [cookie] = useState<Cookie>(new Cookie());
  const [, forceUpdate] = useState({});
  
  // Track number of each upgrade type purchased
  const [autoclickerCount, setAutoclickerCount] = useState(0);
  const [grandmaCount, setGrandmaCount] = useState(0);
  const [mineCount, setMineCount] = useState(0);

  const handleCookieUpdate = () => {
    forceUpdate({});
  };

  // Add cookies per second based on upgrades
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate total CPS from all upgrades
      const autoclickerCPS = autoclickerCount * 1; // 1 CPS per autoclicker
      const grandmaCPS = grandmaCount * 5; // 5 CPS per grandma
      const mineCPS = mineCount * 25; // 25 CPS per mine
      
      const totalCPS = autoclickerCPS + grandmaCPS + mineCPS;
      
      // Add CPS to total cookies
      if (totalCPS > 0) {
        cookie.addCookies(totalCPS);
        forceUpdate({});
      }
    }, 1000); // Run every 1000ms (1 second)

    return () => clearInterval(interval);
  }, [autoclickerCount, grandmaCount, mineCount, cookie]);

  return (
    <main>
      <h1 className="game-title">Cookie Clicker</h1>
      <div style={{ 
        display: 'flex', 
        gap: '-2rem', 
        alignItems: 'flex-start', 
        padding: '0 2rem', 
        justifyContent: 'center',
        minHeight: '70vh'
      }}>
        <div style={{ 
          flex: '0 0 auto', 
          display: 'flex', 
          justifyContent: 'center',
          width: '20%',
        }}>
          <CookieClicker 
            cookie={cookie} 
            onUpdate={handleCookieUpdate} 
            autoclickerCount={autoclickerCount}
            grandmaCount={grandmaCount}
            mineCount={mineCount}
          />
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2.5rem', 
          flex: '0 0 auto',
          width: '300px'
        }}>
          <Upgrade 
            icon="🤖" 
            startingCost={20} 
            baseCPSPerUpgrade={1} 
            cookies={cookie.getTotalCookies()}
            cookie={cookie}
            onUpdate={handleCookieUpdate}
            upgradeCount={autoclickerCount}
            onUpgradePurchased={() => setAutoclickerCount(prev => prev + 1)}
          />
          <Upgrade 
            icon="👵" 
            startingCost={100} 
            baseCPSPerUpgrade={5} 
            cookies={cookie.getTotalCookies()}
            cookie={cookie}
            onUpdate={handleCookieUpdate}
            upgradeCount={grandmaCount}
            onUpgradePurchased={() => setGrandmaCount(prev => prev + 1)}
          />
          <Upgrade 
            icon="⛏️" 
            startingCost={500} 
            baseCPSPerUpgrade={25} 
            cookies={cookie.getTotalCookies()}
            cookie={cookie}
            onUpdate={handleCookieUpdate}
            upgradeCount={mineCount}
            onUpgradePurchased={() => setMineCount(prev => prev + 1)}
          />
        </div>
      </div>
    </main>
  );
}
