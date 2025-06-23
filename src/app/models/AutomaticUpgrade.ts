export class AutomaticUpgrade {
    private costOfNext: number;
    private baseCPSPerUpgrade: number;
    
    static numUpgrades: number = 0;
    static cpsMultiplier: number = 1;
    static readonly UPGRADE_COST_MULTIPLIER = 1.15;

    constructor(startingCost: number, baseCPSPerUpgrade: number) {
        this.costOfNext = startingCost;
        this.baseCPSPerUpgrade = baseCPSPerUpgrade;
    }

    getNumberOfUpgrades(): number {
        return AutomaticUpgrade.numUpgrades;
    }

    getCostOfNext(): number {
        return this.costOfNext;
    }

    getCPSPerUpgrade(): number {
        return (this.baseCPSPerUpgrade * AutomaticUpgrade.numUpgrades) * AutomaticUpgrade.cpsMultiplier;
    }

    buyUpgrade(cookies: number, cookie: any): void {
        if(cookies < this.costOfNext) {
            return;
        }
        
        // Deduct the cost from cookies
        cookie.totalCookies -= this.costOfNext;
        
        AutomaticUpgrade.numUpgrades++;
        this.costOfNext = Math.floor(this.costOfNext * AutomaticUpgrade.UPGRADE_COST_MULTIPLIER);
        if(AutomaticUpgrade.numUpgrades % 10 == 0) {
            AutomaticUpgrade.cpsMultiplier *= 2;
        }
    }

    getPercentUntilNextCPSUpgrade(): number {
        return (AutomaticUpgrade.numUpgrades % 10) / 10;
    }
}