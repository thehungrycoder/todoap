import * as express from "express";
import Task from "../models/task";

const list = async (req: any, res: any) => {
    // const tasks = await Task.find({});

    const tasks = [{
        id: "task1",
        title: "Task 1"
    }];

    res.send(tasks);
};

export {
    list
};
