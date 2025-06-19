export class Cookie {
    private clicks: number;
    private cookiesPerClick: number;
    private totalCookies: number;
    private costOfNextUpgrade: number;

    constructor() {
        this.clicks = 0;
        this.cookiesPerClick = 1;
        this.totalCookies = 0;
        this.costOfNextUpgrade = 10;
    }

    // Getters
    getClicks(): number {
        return this.clicks;
    }

    getCostOfNextUpgrade(): number {
        return this.costOfNextUpgrade;
    }

    getCookiesPerClick(): number {
        return this.cookiesPerClick;
    }

    getTotalCookies(): number {
        return this.totalCookies;
    }

    // Methods
    click(): void {
        this.clicks++;
        this.totalCookies += this.cookiesPerClick;
    }

    upgradeCookiesPerClick(): boolean {
        if (this.totalCookies >= this.costOfNextUpgrade) {
            this.totalCookies -= this.costOfNextUpgrade;
            this.cookiesPerClick += 1;
            this.costOfNextUpgrade *= 2;
            return true;
        }
        return false;
    }
} 