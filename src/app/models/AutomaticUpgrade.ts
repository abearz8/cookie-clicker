export class AutomaticUpgrade {
    private numberOfUpgrades: number;
    private costOfNext: number;
    private baseCPSPerUpgrade: number;
    private cpsMultiplier: number;

    static readonly UPGRADE_COST_MULTIPLIER = 1.15;

    constructor(startingCost: number, baseCPSPerUpgrade: number) {
        this.costOfNext = startingCost;
        this.baseCPSPerUpgrade = baseCPSPerUpgrade;
        this.numberOfUpgrades = 0;
        this.cpsMultiplier = 1;
    }

    getNumberOfUpgrades(): number {
        return this.numberOfUpgrades;
    }

    getCostOfNext(): number {
        return this.costOfNext;
    }

    getCPSPerUpgrade(): number {
        return (this.baseCPSPerUpgrade * this.numberOfUpgrades) * this.cpsMultiplier;
    }

    buyUpgrade(cookies: number): void {
        if(cookies < this.costOfNext) {
            return;
        }
        
        this.numberOfUpgrades++;
        this.costOfNext *= AutomaticUpgrade.UPGRADE_COST_MULTIPLIER;
        if(this.numberOfUpgrades % 10 == 0) {
            this.cpsMultiplier *= 2;
        }
    }

    getPercentUntilNextCPSUpgrade(): number {
        return (this.numberOfUpgrades % 10) / 10;
    }
}