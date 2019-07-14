import assert from "assert";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
dotenv.config();

// Connection URL
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

// Create a new MongoClient
const client = new MongoClient(url);

const connect = () => {
    client.connect((err: Error) => {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb server");
    const db = client.db(dbName);
    client.close();
  });
};

export default connect;
