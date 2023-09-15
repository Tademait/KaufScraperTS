import AlzaPriceScraper from "./scraperModules/alzaPriceScraper";

type SupportedHosts = {
    [host: string]: typeof AlzaPriceScraper;
  };

export const supportedHosts: SupportedHosts = {
    "www.alza.cz": AlzaPriceScraper,
    "www.alza.sk": AlzaPriceScraper,
}