import _ from "lodash";
import Task from "../models/task";

/**
 * Returns list of tasks
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const list = async (req: any, res: any) => {
    const tasks = await Task.find().select("_id name");
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
    const {name, description, due_date, status = "pending"} = req.body;

    const task = new Task({name, description, dueDate: due_date, status});
    await task.save();

    res.status(201).send({
        id: task._id
    });
};

const update = async (req: any, res: any) => {
    const taskId = req.params.id;

    const updateValues = _.pick(req.body, ["name", "description", "due_date", "status"]);
    const task = await Task.findOneAndUpdate({_id: taskId}, {$set: updateValues}, {new: true});

    try {
        const result = await task.save();
        res.send(task);

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
