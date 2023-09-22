import { Page } from "puppeteer";
import { ScrapedDataObject } from "../types";

class AlzaPriceScraper {
    constructor() {
    }
    async login(page: Page) {
        // note that the login window is actually an iframe with its own html document
        function timeout(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function sleep(fn: any, ...args: any[]) {
            console.log("sleeping");
            await timeout(5000);
            console.log("10 seconds ran out");
            return fn(...args);
        }
        await page.goto('https://alza.cz');
        await page.waitForSelector('[data-testid="headerContextMenuToggleLogin"]');
        await page.click('[data-testid="headerContextMenuToggleLogin"]');

        await page.waitForTimeout(5000);

        const frames = page.frames();
        //console.log(frames);
        const frame = frames.find(frame => frame.name() === 'loginIframe');
        //console.log(frame);
        if (!frame) {
            //throw new Error('Cannot find login iframe');
            console.error("Cannot find login frame, continuing without logging in");
            return;
        }
        if (!process.env.ALZA_USERNAME || !process.env.ALZA_PASSWORD){
            throw "Variables ALZA_USERNAME or ALZA_PASSWORD not set in .env file. Can't log in."
        }
        await frame.waitForSelector('#userName');
        await frame.type('#userName', process.env.ALZA_USERNAME);
        await frame.type('#password', process.env.ALZA_PASSWORD);
        await frame.click('#btnLogin');
        await frame.waitForNavigation();

        await page.screenshot({path: 'iframe.png'});
    }

    async getElementData(page: Page, selector: string, selectorToWaitFor?: string): Promise<string | undefined> {
        if (selectorToWaitFor) {
            page.waitForSelector(selectorToWaitFor);
        }
        const elementHandle = await page.$(selector);
        if (elementHandle) {
            const text = await page.evaluate(el => el.textContent, elementHandle);
            return text ? text.trim() : "N/A";
        }
    }

    async scrape(url: URL, page: Page) {
        //TODO await this.login(page);
        // '.price-box__price' '.AlzaText'
        const scrapedInfo: ScrapedDataObject = {
            title: '',
            price: '',
            stockInfo: '',
            isOnSale: false,
            productPicUrl: '',
            hostname: '',
            hostFavicon: '',
          };

        //@ts-ignore - apparently pupetteer can parse the URL afterall
        await page.goto(url);

        scrapedInfo.hostname = url.hostname;
        scrapedInfo.title = await this.getElementData(page, '#h1c',  '.price-box__price-text');
        scrapedInfo.price = await this.getElementData(page, '.price-box__price');
        scrapedInfo.stockInfo = await this.getElementData(page, '.AlzaText', '.AlzaText');

        return scrapedInfo;
    }
}

export default AlzaPriceScraper;