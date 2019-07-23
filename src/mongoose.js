import assert from "assert";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGO_URL;
mongoose.set("useFindAndModify", false);

const connect = () => {
    mongoose.connect(url, {useNewUrlParser: true});
    const conn = mongoose.connection;
    conn.on("error", console.error.bind(console, "connection error:"));
    conn.once("open", () => {
        console.log("Mongo connection established");
    });
};

export default connect;
