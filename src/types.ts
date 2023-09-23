export interface ScrapedDataObject {
  title: string | undefined;
  stockInfo: string | undefined;
  price: string | undefined;
  productPicUrl: string | undefined;
  isOnSale: boolean | undefined;
  salePercentage?: number | undefined; // Optional field
  hostname: string;
  hostFavicon: string;
  productUrl: string;
}
