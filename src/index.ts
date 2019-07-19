import dotenv from "dotenv";
import express from "express";
// import mongoConnect from "./mongoose";
const app = express();
import routes from "./routes";

dotenv.config();
// mongoConnect();
const port = process.env.SERVER_PORT;

routes(app);

// start the server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
