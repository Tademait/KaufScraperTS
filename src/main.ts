import UrlParser from './urlParser';
import ScraperManager from './scraperManager';
import {logWrapper} from './helpers';


async function main() {
    const urlParser = new UrlParser();
    await urlParser.parseFile("./urls.txt");
    const urls = urlParser.getUrls();

    const scraperManager = new ScraperManager();
    await scraperManager.scrape(urls);
}

logWrapper(main)();