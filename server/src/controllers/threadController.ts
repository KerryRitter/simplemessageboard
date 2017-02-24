import * as express from "express";
import { lazyInject, provideNamed } from "../ioc";
import { BaseController, Controller, Get, Post, TYPE } from "./baseController";
import { ThreadService } from "../services";

@provideNamed(TYPE.Controller, "ThreadController")
@Controller("/api/threads")
export class ThreadController implements BaseController {
    @lazyInject("ThreadService")
    private readonly _threadService: ThreadService;

    @Post("/")
    public async create(req: express.Request, res: express.Response) {
        try {
            console.log(req.body);
            await this._threadService.create(req.body);
            res.sendStatus(201);
        } catch (ex) {
            res.sendStatus(500);
        }
    }

    @Get("/")
    public async getAll(req: express.Request, res: express.Response) {
        const threads = await this._threadService.getAll();
        res.json(threads);
    }
}