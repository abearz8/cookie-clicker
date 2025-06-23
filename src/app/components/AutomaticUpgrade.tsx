import {useState} from 'react';
import { AutomaticUpgrade as AutomaticUpgradeModel } from '../models/AutomaticUpgrade';
import { Cookie } from '../models/Cookie';
import styles from './AutomaticUpgrade.module.css';

interface AutomaticUpgradeProps {
    icon: string;
    startingCost: number;
    baseCPSPerUpgrade: number;
    cookies: number;
    cookie: Cookie;
    onUpdate: () => void;
    upgradeCount: number;
    onUpgradePurchased: () => void;
}

export default function AutomaticUpgrade({ 
    icon, 
    startingCost, 
    baseCPSPerUpgrade,
    cookies,
    cookie,
    onUpdate,
    upgradeCount,
    onUpgradePurchased
}: AutomaticUpgradeProps) {
    const [upgrade] = useState<AutomaticUpgradeModel>(() => {
        return new AutomaticUpgradeModel(startingCost, baseCPSPerUpgrade);
    });

    const handleBuyUpgrade = () => {
        upgrade.buyUpgrade(cookies, cookie);
        onUpgradePurchased();
        onUpdate();
    }

    const cost = upgrade.getCostOfNext();
    const formattedCost = isNaN(cost) ? startingCost : Math.floor(cost);

    return (
        <div className={styles.container}>
            <div className={styles.upgradeRow}>
                <button 
                    className={styles.upgradeButton}
                    onClick={handleBuyUpgrade}
                    disabled={cookies < cost}
                >
                    {icon}
                </button>
                
                <div className={styles.upgradeInfo}>
                    <div className={styles.costText}>
                        Cost: {formattedCost} cookies
                    </div>
                    <div className={styles.ownedText}>
                        Owned: {upgradeCount}
                    </div>
                </div>
            </div>
            
            <div className={styles.progressBarContainer}>
                <div 
                    className={styles.progressBar}
                    style={{ width: `${upgrade.getPercentUntilNextCPSUpgrade() * 100}%` }}
                ></div>
            </div>
        </div>
    );
}