import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
// import mongoConnect from "./mongoose";
const app = express();
import routes from "./routes";

dotenv.config();
// mongoConnect();
const port = process.env.SERVER_PORT;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// start the server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
