export interface GameSaveData {
  cookies: number;
  cookiesPerClick: number;
  numUpgrades: number;
  multiplier: number;
  costOfNextUpgrade: number;
  lastSave: number; 
  upgrades: {
    autoclicker: {
      numUpgrades: number;
      costOfNext: number;
      cpsMultiplier: number;
    };
    grandma: {
      numUpgrades: number;
      costOfNext: number;
      cpsMultiplier: number;
    };
    mine: {
      numUpgrades: number;
      costOfNext: number;
      cpsMultiplier: number;
    };
  };
}

const SAVE_KEY = 'cookie-clicker-save';

export const saveGame = (cookie: any, upgrades: any) => {
  const saveData: GameSaveData = {
    cookies: cookie.totalCookies,
    cookiesPerClick: cookie.cookiesPerClick,
    numUpgrades: cookie.numUpgrades,
    multiplier: cookie.multiplier,
    costOfNextUpgrade: cookie.costOfNextUpgrade,
    lastSave: Date.now(),
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
  
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
};

export const loadGame = (): GameSaveData | null => {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const calculateOfflineEarnings = (savedData: GameSaveData): number => {
  const now = Date.now();
  const timeDiff = now - savedData.lastSave;
  const secondsOffline = Math.floor(timeDiff / 1000);
  
  // Calculate total CPS from saved upgrades
  const autoclickerCPS = savedData.upgrades.autoclicker.numUpgrades * savedData.upgrades.autoclicker.cpsMultiplier;
  const grandmaCPS = savedData.upgrades.grandma.numUpgrades * savedData.upgrades.grandma.cpsMultiplier * 5;
  const mineCPS = savedData.upgrades.mine.numUpgrades * savedData.upgrades.mine.cpsMultiplier * 25;
  
  const totalCPS = autoclickerCPS + grandmaCPS + mineCPS;
  
  return totalCPS * secondsOffline;
};

export const resetGame = () => {
  localStorage.removeItem(SAVE_KEY);
  window.location.reload();
}; 