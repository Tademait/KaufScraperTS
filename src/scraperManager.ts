import puppeteer from 'puppeteer';
import { supportedHosts } from './config';
import sendWebhook from './webhookSender';
import { ScrapedDataObject } from './types';

class ScraperManager {
    loadedModules: any //TODO create a scraperObj / module TS type
    constructor() {
        this.loadedModules = [];
    }

    async scrape(urlList: URL[]) {
        const browser = await puppeteer.launch({ "headless": "new"});
        for (const url of urlList) {
            const page = await browser.newPage();
            console.log(`Currently scraping: ${url.host}...`);
            const scraper = this.selectScraperModule(url.host);
            if (!scraper) {
                console.error(`Host ${url.host} is not supported`);
                continue;
            }
            const scrapedInfoObject: ScrapedDataObject = await scraper.scrape(url, page);
            console.log(scrapedInfoObject);
            const response = await sendWebhook(
                {
                title: scrapedInfoObject.title,
                url: url.href,
                description: scrapedInfoObject.stockInfo,
                footer: {text: scrapedInfoObject.hostname, icon_url: "https://www.google.com/favicon.ico"},
                }
            );
        }
        browser.close();
    }

    selectScraperModule(hostname: string) {
        if (!(hostname in supportedHosts)){
            return null;
        }
        if (!this.loadedModules[hostname]){
            // lazy loading scrapers
            const scraperClass = supportedHosts[hostname];
            this.loadedModules[hostname] = new scraperClass();
        }
        return this.loadedModules[hostname];
    }   
}

export default ScraperManager;