import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as path from "path";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./container";

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.set("views", path.join(__dirname, "./views"));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use("/public", express.static(path.join(__dirname, "../public")));
});

let app = server.build();
app.listen(process.env.PORT || 7777);
console.log("Server started");

exports = module.exports = app;