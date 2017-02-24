import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import path from "path";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./ioc";

import "./ioc/loader";

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use("/static", express.static(path.join(__dirname, "../../client/dist")));
    app.use("/", express.static(path.join(__dirname, "../../client/dist/index.html")));
});

let app = server.build();
app.listen(process.env.PORT || 7777);
console.log("Server started");

exports = module.exports = app;