import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: String,
    dueDate: Date,
    name: {type: String, required: true},
    status: {type: String, required: true}
});

taskSchema.set("toJSON", {
    virtuals: true
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
