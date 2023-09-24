import { Database } from "./database";
import { ScrapedDataObject } from "./types";

export function checkProductHistory(
  scrapedInfoObject: ScrapedDataObject
): boolean {
  // check the mean price / most recent price for object.url
  // if there is no history, just send it (return true)
  // otherwise return bool based on if the momentary price is lower than the mean/most recent (true/false)
  const db = new Database("kaufscraper_products.db");
  if (!db.doesTableExist("products")) {
    db.createTable();
  }
  db.insertInfo(
    scrapedInfoObject.productUrl,
    scrapedInfoObject.title,
    scrapedInfoObject.price
  );
  db.queryInfo();
  db.closeConnection();

  return false;
}
