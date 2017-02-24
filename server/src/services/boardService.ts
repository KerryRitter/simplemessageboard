import { lazyInject } from "../ioc";
import { Board } from "../models";
import { MongoService } from "./mongoService";

export class BoardService {
    @lazyInject("MongoService") private readonly _mongoService: MongoService;

    public create(board: Board) {
        return this._mongoService.connect().then(db => {
            db.insertDocuments("board", board);
        }).then(() => this._mongoService.disconnect());
    }
}