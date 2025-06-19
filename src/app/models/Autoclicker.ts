export class Autoclicker {
    private numberOfAutoclickers: number;
    private costOfNext: number;
    private cookiesPerSecond: number;

    constructor() {
        this.numberOfAutoclickers = 0;
        this.costOfNext = 20;
        this.cookiesPerSecond = 1;
    }

    getNumberOfAutoclickers(): number {
        return this.numberOfAutoclickers;
    }

    getCostOfNext(): number {
        return this.costOfNext;
    }

    getCookiesPerSecond(): number {
        return this.cookiesPerSecond;
    }

    buyAutoclicker(): void {
        this.numberOfAutoclickers++;
        this.costOfNext += 20;
        if(this.numberOfAutoclickers % 10 == 0) {
            this.cookiesPerSecond *= 2;
        }
    }

    getPercentUntilNextCPSUpgrade(): number {
        return (this.numberOfAutoclickers % 10) / 10;
    }
}