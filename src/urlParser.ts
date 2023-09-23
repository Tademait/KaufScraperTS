// @ts-ignore
import fs from "fs";
// @ts-ignore
import readline from "readline";

class UrlParser {
  _urls: URL[];
  constructor() {
    this._urls = [];
  }
  async parseFile(filePath: fs.PathLike) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line: string) => {
      // read each line
      try {
        const url = new URL(line);
        this._urls.push(url);
      } catch (err) {
        console.error(`Invalid URL: ${line}`);
      }
    });

    rl.on("close", () => {
      // file reading finished
    });
  }
  getUrls() {
    return this._urls;
  }
}
export default UrlParser;
