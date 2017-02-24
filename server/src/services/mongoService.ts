import { provide } from "../ioc";
import Mongo from "mongodb";

@provide("MongoService")
export class MongoService {
    private static __db: Mongo.Db;
    private readonly _databaseUrl = "";
    private get _db() {
        return MongoService.__db;
    }
    private set _db(db: Mongo.Db) {
        MongoService.__db = db;
    }

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

    public insertDocuments<T>(collection: string, documents: T|T[]) {
        return new Promise((resolve, reject) => {
            if (document instanceof Array) {
                this._db.collection(collection).insertMany(documents as T[], (err, result) => err ? reject(err) : resolve(result));
            } else {
                this._db.collection(collection).insertOne(documents as T, (err, result) => err ? reject(err) : resolve(result));
            }
        });
    }

    public disconnect() {
        if (this._db) {
            this._db.close();
        }
    }
}