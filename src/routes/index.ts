import * as express from "express";
import {create, destroy, get, list, update} from "../controllers/tasks";

const route = (app: express.Application) => {
    app.get("/", (req: any, res) => {
        res.send("Hello world!");
    });

    app.get("/tasks", list);
    app.post("/tasks", create);
    app.get("/tasks/:id", get);
    app.put("/tasks/:id", update);
    app.delete("/tasks/:id", destroy);

};

export default route;
