import {getListFilters, getParsedDueDate} from "../helpers";
import Task from "../models/task";

/**
 * Returns list of tasks
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const list = async (req: any, res: any) => {
    const filters = getListFilters(req.query);

    const tasks = await Task.find(filters)
        .select("_id name");
    res.send(tasks);
};

/**
 * Returns a single task
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const get = async (req: any, res: any) => {
    const taskId = req.params.id;
    const task = await Task.findOne({_id: taskId});
    res.send(task);
};

const create = async (req: any, res: any) => {
    const {name, description, due_date: dueDate = "today", status = "pending"} = req.body;

    const task = new Task({name, description, dueDate: getParsedDueDate(dueDate), status});
    await task.save();

    res.status(201).send({
        id: task._id
    });
};

/**
 * Update status field
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const update = async (req: any, res: any) => {
    const taskId = req.params.id;

    const {status} = req.body;
    if (!status) {
        res.status(422).send("Provide new status for the task");
    }

    const task = await Task.findOneAndUpdate({_id: taskId}, {$set: {status}}, {new: true});

    try {
        const newTask = await task.save();
        res.send(newTask);

    } catch (err) {
        if (!task) {
            res.status(404).send(null);
        } else {
            console.log("err", err);
            res.status(500).send(err.message);
        }
    }
};

const destroy = async (req: any, res: any) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({_id: taskId});

    if (task) {
        res.status(204).send(null);
    } else {
        res.status(404).send(null);
    }
};

export {
    create,
    destroy,
    get,
    list,
    update
};
