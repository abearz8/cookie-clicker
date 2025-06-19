export class Cookie {
    private clicks: number;
    private cookiesPerClick: number;
    private totalCookies: number;

    constructor() {
        this.clicks = 0;
        this.cookiesPerClick = 1;
        this.totalCookies = 0;
    }

    // Getters
    getClicks(): number {
        return this.clicks;
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

    upgradeCookiesPerClick(cost: number): boolean {
        if (this.totalCookies >= cost) {
            this.totalCookies -= cost;
            this.cookiesPerClick += 1;
            return true;
        }
        return false;
    }
} 