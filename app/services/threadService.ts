import { provide, lazyInject } from "../../lib/ioc";
import { Thread } from "../../core/models";
import { MongoService } from "./mongoService";

@provide("ThreadService")
export class ThreadService {
    @lazyInject("MongoService") private readonly _mongoService: MongoService;

    public create(thread: Thread): Promise<any> {
        return this._mongoService.connect().then(db => {
            db.insert("threads", thread);
        }).then(() => this._mongoService.disconnect());
    }

    public getAll(): Promise<Thread[]> {
        return this._mongoService.connect().then(db => {
            return db.getAll<Thread>("threads");
        }).then(threads => {
            this._mongoService.disconnect();
            return threads;
        });
    }
}