import * as express from "express";
import { provideNamed } from "../../lib/ioc";
import { BaseController, Controller, Get, TYPE } from "../../lib/baseController";

@provideNamed(TYPE.Controller, "HomeController")
@Controller("/")
export class HomeController implements BaseController {
    @Get("/")
    public get(req: express.Request, res: express.Response) {
        res.render("index");
    }
}