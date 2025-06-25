export class Cookie {
    public cookiesPerClick: number;
    public numUpgrades: number;
    public multiplier: number;
    public totalCookies: number;
    public costOfNextUpgrade: number;

    constructor() {
        this.cookiesPerClick = 1;
        this.totalCookies = 0;
        this.costOfNextUpgrade = 10;
        this.numUpgrades = 1;
        this.multiplier = 1;
    }

    loadFromSave(data: {
        cookies: number;
        cookiesPerClick: number;
        numUpgrades: number;
        multiplier: number;
        costOfNextUpgrade: number;
    }) {
        this.totalCookies = data.cookies;
        this.cookiesPerClick = data.cookiesPerClick;
        this.numUpgrades = data.numUpgrades;
        this.multiplier = data.multiplier;
        this.costOfNextUpgrade = data.costOfNextUpgrade;
    }

    // Getters
    getCostOfNextUpgrade(): number {
        return this.costOfNextUpgrade;
    }

    getCookiesPerClick(): number {
        return this.cookiesPerClick * this.multiplier;
    }

    getTotalCookies(): number {
        return this.totalCookies;
    }

    // Methods
    click(): void {
        this.totalCookies += this.getCookiesPerClick();
    }

    upgradeCookiesPerClick(): boolean {
        if (this.totalCookies >= this.costOfNextUpgrade) {
            this.totalCookies -= this.costOfNextUpgrade;
            this.costOfNextUpgrade *= 2;
            this.cookiesPerClick += this.multiplier;
            
            if(this.numUpgrades % 3 === 0) {
                this.multiplier *= 2;
            } 
            this.numUpgrades++;
            return true;
        }
        return false;
    }

    addCookies(amount: number): void {
        this.totalCookies += amount;
    }
} 