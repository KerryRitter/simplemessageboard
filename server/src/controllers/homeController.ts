import * as express from "express";
import { provideNamed } from "../ioc";
import { BaseController, Controller, Get, TYPE } from "./baseController";

@provideNamed(TYPE.Controller, "HomeController")
@Controller("/")
export class HomeController implements BaseController {
    @Get("/")
    public get(req: express.Request, res: express.Response) {
        res.render("index");
    }
}