import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as express from "express";
import * as path from "path";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./ioc";

import "./ioc/loader";

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.set("views", path.join(__dirname, "./views"));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use("/dist", express.static(path.join(__dirname, "../../client/dist")));
});

let app = server.build();
app.listen(process.env.PORT || 7777);
console.log("Server started");

exports = module.exports = app;