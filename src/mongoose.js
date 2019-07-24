import assert from "assert";
import config from "config";
import mongoose from "mongoose";

mongoose.set("useFindAndModify", false);

const connect = () => {
    mongoose.connect(config.get('MONGO_URL'), {useNewUrlParser: true});
    const conn = mongoose.connection;
    conn.on("error", console.error.bind(console, "connection error:"));
    conn.once("open", () => {
        console.log("Mongo connection established");
    });
};

export default connect;
