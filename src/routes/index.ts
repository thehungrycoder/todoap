import * as express from "express";
import {list} from "../controllers/tasks";

const route = (app: express.Application) => {
    app.get("/", (req: any, res) => {
        res.send("Hello world!");
    });

    app.use("/tasks", list);

};

export default route;
