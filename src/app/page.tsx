'use client';

import { useState } from 'react';
import { Cookie } from './models/Cookie';
import Upgrade from './components/AutomaticUpgrade';
import CookieClicker from './components/CookieClicker';

export default function Home() {
  const [cookie] = useState<Cookie>(new Cookie());
  const [, forceUpdate] = useState({});

  const handleCookieUpdate = () => {
    forceUpdate({});
  };

  return (
    <main>
      <h1 className="game-title">Cookie Clicker</h1>
      <CookieClicker cookie={cookie} onUpdate={handleCookieUpdate} />
      <Upgrade 
        icon="🍪" 
        startingCost={20} 
        baseCPSPerUpgrade={1} 
        cookies={cookie.getTotalCookies()}
      />
    </main>
  );
}
