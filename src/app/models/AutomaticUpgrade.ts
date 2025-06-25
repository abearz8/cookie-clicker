export class AutomaticUpgrade {
    public costOfNext: number;
    private baseCPSPerUpgrade: number;
    public numUpgrades: number;
    public cpsMultiplier: number;
    private readonly UPGRADE_COST_MULTIPLIER = 1.15;

    constructor(startingCost: number, baseCPSPerUpgrade: number) {
        this.costOfNext = startingCost;
        this.baseCPSPerUpgrade = baseCPSPerUpgrade;
        this.numUpgrades = 0;
        this.cpsMultiplier = 1;
    }

    loadFromSave(data: {
        numUpgrades: number;
        costOfNext: number;
        cpsMultiplier: number;
    }) {
        this.numUpgrades = data.numUpgrades;
        this.costOfNext = data.costOfNext;
        this.cpsMultiplier = data.cpsMultiplier;
    }

    getNumberOfUpgrades(): number {
        return this.numUpgrades;
    }

    getCostOfNext(): number {
        return this.costOfNext;
    }

    getCPSPerUpgrade(): number {
        return this.baseCPSPerUpgrade * this.cpsMultiplier;
    }

    getTotalCPS(): number {
        return this.numUpgrades * this.getCPSPerUpgrade();
    }

    buyUpgrade(cookies: number, cookie: any): boolean {
        if(cookies < this.costOfNext) {
            return false;
        }
        
        cookie.totalCookies -= this.costOfNext;
        this.numUpgrades++;
        this.costOfNext = Math.floor(this.costOfNext * this.UPGRADE_COST_MULTIPLIER);
        
        if(this.numUpgrades % 10 === 0) {
            this.cpsMultiplier *= 2;
        }
        
        return true;
    }

    getPercentUntilNextCPSUpgrade(): number {
        return (this.numUpgrades % 10) / 10;
    }
}