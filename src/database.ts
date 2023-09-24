import sqlite3 from "sqlite3";
import { formatPrice } from "./helpers";

export class Database {
  private db: sqlite3.Database;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the SQLite database");
      }
    });
  }

  doesTableExist(tableName: string): boolean {
    this.db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
      [tableName],
      (err, row) => {
        if (err) {
          console.error("error checking table: " + err);
          return false;
        } else {
          return row ? true : false;
        }
      }
    );
    return false;
  }
  createTable(): void {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            url TEXT,
            name TEXT,
            price INTEGER
          )`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table products created or already exists`);
        }
      }
    );
  }
  queryInfo() {
    this.db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        console.error("Error querying data:", err.message);
      } else {
        rows.forEach((row) => {
          console.log(
            // @ts-ignore
            `Product info: ${row.id}, Name: ${row.name}, Price: ${row.price}`
          );
        });
      }
    });
  }
  insertInfo(url: string, name: string, price: string) {
    this.db.run(
      "INSERT INTO products (url, name, price) VALUES (?, ?, ?)",
      [url, name, formatPrice(price)],
      (err) => {
        if (err) {
          console.error("Error querying data:", err.message);
        } else {
          console.log(`Product --${name}-- inserted into the db`);
        }
      }
    );
  }
  closeConnection() {
    this.db.close();
  }
}
