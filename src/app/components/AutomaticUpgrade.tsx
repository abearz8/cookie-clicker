import { AutomaticUpgrade as AutomaticUpgradeModel } from '../models/AutomaticUpgrade';
import styles from './AutomaticUpgrade.module.css';

interface AutomaticUpgradeProps {
    icon: string;
    upgrade: AutomaticUpgradeModel;
    cookies: number;
    onPurchase: () => void;
}

export default function AutomaticUpgrade({ 
    icon, 
    upgrade,
    cookies,
    onPurchase
}: AutomaticUpgradeProps) {
    const handleBuyUpgrade = () => {
        onPurchase();
    }

    const cost = upgrade.getCostOfNext();
    const formattedCost = isNaN(cost) ? 0 : Math.floor(cost);

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
                        Owned: {upgrade.getNumberOfUpgrades()}
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