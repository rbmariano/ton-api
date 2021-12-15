import sqlite3 from "sqlite3";

sqlite3.verbose();

class Sqlite {
  public db: sqlite3.Database;
  constructor() {
    this.db = new sqlite3.Database("./db", (err) => {
      if (err) {
        console.log("Could not connect to database", err);
        return;
      }
      console.log("Connected to database");
      (async () => await this.createTableUser())();
    });
  }

  public async select(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err: any, result: any[]) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  public async insert(tableName: string, vm: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${tableName} (${Object.keys(
        vm
      )}) VALUES(${Object.keys(vm)
        .map(() => "?")
        .join(", ")})`;

      this.db.run(
        query,
        Object.keys(vm).map((prop) => vm[prop]),
        (err: any, result: any) => {
          if (err) return reject(err);
          return resolve(result);
        }
      );
    });
  }

  public async createTableUser(): Promise<sqlite3.Database> {
    const query =
      "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);";

    return this.db.exec(query);
  }
}

export default new Sqlite();
