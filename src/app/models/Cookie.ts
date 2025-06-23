export class Cookie {
    private clicks: number;
    private cookiesPerClick: number;
    private numUpgrades: number;
    private multiplier: number;
    private totalCookies: number;
    private costOfNextUpgrade: number;

    constructor() {
        this.clicks = 0;
        this.cookiesPerClick = 1;
        this.totalCookies = 0;
        this.costOfNextUpgrade = 10;
        this.numUpgrades = 1;
        this.multiplier = 1;
    }

    // Getters
    getClicks(): number {
        return this.clicks;
    }

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
        this.clicks++;
        this.totalCookies += this.cookiesPerClick * this.multiplier;
    }

    upgradeCookiesPerClick(): boolean {
        if (this.totalCookies >= this.costOfNextUpgrade) {
            this.totalCookies -= this.costOfNextUpgrade;
            this.costOfNextUpgrade *= 2;
            this.cookiesPerClick += this.multiplier;
            if(this.numUpgrades % 4 == 0) {
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