// @ts-ignore
import fs from 'fs';
// @ts-ignore
import readline from 'readline'; 


class UrlParser {
    _urls: URL[]
    constructor() {
        this._urls = [];
    }
    async parseFile(filePath: fs.PathLike) {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        rl.on('line', (line: string) => {
            // read each line
            try {
                const url = new URL(line);
                this._urls.push(url);
            }
            catch (err) {
                console.error(`Invalid URL: ${line}`);
            }
        });

        rl.on('close', () => {
            // file reading finished
        });
    }
    // readFileSyncByLine(filePath) {
    //     try {
    //       const fileContent = fs.readFileSync(filePath, 'utf8');
    //       const lines = fileContent.split('\n');
    //       return lines;
    //     } catch (error) {
    //       throw new Error('Error reading file: ' + error.message);
    //     }
    //   }
    // //  parseFile(filePath) {
    //     try {
    //         const lines = this.readFileSyncByLine(filePath);
    //         for (const line of lines) {
    //             const url = new URL(line);
    //             this.urls.push(url);
    //         }
    //         console.log('File reading completed.');
    //       } catch (error) {
    //         if (error instanceof TypeError) {
    //             console.error('Invalid URL: ' + error.message);
    //             return;
    //             }
    //         console.error(error.message);
    //       }
    //   }      
      
    getUrls() {
        return this._urls;
    }
}
export default UrlParser;