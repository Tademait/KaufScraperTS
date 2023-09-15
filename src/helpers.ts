type FunctionToWrap = (...args: any[]) => any

export function logWrapper(originalFunc: FunctionToWrap) {
    return async function(...args: any[]) {
      console.log(`[${formatDate(Date.now())}]: Scraper started...`);
      const result = await originalFunc.apply(args);
      console.log(`[${formatDate(Date.now())}]: Scraper finished.`);
      return result;
    };
  }

export function formatDate(date: number) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return new Date(date).toLocaleDateString('en-UK');
}
