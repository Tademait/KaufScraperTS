type FunctionToWrap = (...args: any[]) => any

export function logWrapper(originalFunc: FunctionToWrap) {
    return async function(...args: any[]) {
      console.log(`[${formatDate(new Date)}]: Scraper started...`);
      const result = await originalFunc.apply(args);
      console.log(`[${formatDate(new Date)}]: Scraper finished.`);
      return result;
    };
  }

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} | ${hours}:${minutes}:${seconds}`;
}
