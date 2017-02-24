import { lazyInject } from "../ioc";
import express from "express";
import { BaseController, Controller, Post } from "./baseController";
import { BoardService } from "../services/boardService";

@Controller("/board")
export class BoardController implements BaseController {
    @lazyInject("BoardService") private readonly _boardService: BoardService;

    @Post("/")
    public async create(req: express.Request, res: express.Response) {
        await this._boardService.create(req.body);
        res.sendStatus(201);
    }
}