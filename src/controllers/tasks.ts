import * as express from "express";
import Task from "../models/task";

/**
 * Returns list of tasks
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const list = async (req: any, res: any) => {
    // const tasks = await Task.find({});

    const tasks = [{
        id: "task1",
        name: "Task 1"
    }];

    res.send(tasks);
};

/**
 * Returns a single task
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const get = async (req: any, res: any) => {
    // const tasks = await Task.find({});

    const taskId = req.params.id;

    const task = {
        due_date: new Date(),
        id: "task1",
        name: `Task ${taskId}`
    };
    res.send(task);
};

const create = (req: any, res: any) => {
    res.send({
        ...req.body,
        id: "101"
    }, 201);
};

const update = (req: any, res: any) => {
    const taskId = req.params.id;
    console.log(taskId);
};

const destroy = (req: any, res: any) => {
    const taskId = req.params.id;

    console.log(taskId);

    res.send(null, 204);
};

export {
    create,
    destroy,
    get,
    list,
    update
};
