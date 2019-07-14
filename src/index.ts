import dotenv from "dotenv";
import express from "express";
const app = express();
import mongoConnect from "./mongo";
import routes from "./routes";

dotenv.config();
mongoConnect();
const port = process.env.SERVER_PORT;

routes(app);

// start the server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
