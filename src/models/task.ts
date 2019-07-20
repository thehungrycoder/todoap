import mongoose from "mongoose";
import TaskInterface from "./task.interface";

const taskSchema = new mongoose.Schema({
    description: String,
    dueDate: Date,
    name: {type: String, required: true},
    status: {type: String, required: true}
});

taskSchema.set("toJSON", {
    virtuals: true
});

const Task = mongoose.model<TaskInterface & mongoose.Document>("Task", taskSchema);

export default Task;
