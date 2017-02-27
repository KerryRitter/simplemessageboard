import * as Mongo from "mongodb";
import { provide } from "../../lib/ioc";

@provide("MongoService")
export class MongoService {
    private _db: Mongo.Db;
    private readonly _databaseUrl = process.env.MONGODB_URI;

    public connect() {
        return new Promise<MongoService>((resolve, reject) => {
            if (this._db) {
                resolve(this);
                return;
            }

            Mongo.MongoClient.connect(this._databaseUrl, (error, db) => {
               if (error) {
                   reject(error);
               } else {
                   this._db = db;
                   resolve(this);
               }
            });
        });
    }

    public insert<T>(collection: string, documents: T|T[]) {
        return new Promise((resolve, reject) => {
            if (documents instanceof Array) {
                this._db.collection(collection).insertMany(documents as T[], (err, result) => err ? reject(err) : resolve(result));
            } else {
                this._db.collection(collection).insertOne(documents as T, (err, result) => err ? reject(err) : resolve(result));
            }
        });
    }

    public getAll<T>(collection: string) {
        return new Promise<T[]>((resolve, reject) => {
            this._db.collection(collection).find().toArray((error, documents) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(documents);
                }
            });
        });
    }

    public disconnect() {
        if (this._db) {
            this._db.close();
        }
    }
}