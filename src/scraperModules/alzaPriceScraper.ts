import { Page } from "puppeteer";
import { ScrapedDataObject } from "../types";
import { getElementSrc, getElementText } from "../helpers";

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

    async scrape(url: URL, page: Page) {
        //TODO await this.login(page);
        const scrapedInfo: ScrapedDataObject = {
            productUrl: '',
            title: '',
            price: '',
            stockInfo: '',
            isOnSale: false,
            productPicUrl: '',
            hostname: '',
            hostFavicon: 'https://play-lh.googleusercontent.com/K11f9QMY2BNt8bpsxyXLiw0ugzBvabvAQlujNxZribAYCs0MWfC4Lx6788ggTWCRQzU=w240-h480', // Alza favicon
          };

        //@ts-ignore - apparently puppeteer can parse the URL afterall
        await page.goto(url);

        scrapedInfo.productUrl = url.href;
        scrapedInfo.hostname = url.hostname;
        scrapedInfo.title = await getElementText(page, '#h1c',  '.price-box__price-text');
        scrapedInfo.price = await getElementText(page, '.price-box__price');
        scrapedInfo.stockInfo = await getElementText(page, '.AlzaText', '.AlzaText');
        scrapedInfo.productPicUrl = await getElementSrc(page, '.detailGallery-alz-6', '.detailGallery-alz-6');
        
        return scrapedInfo;
    }
}

export default AlzaPriceScraper;