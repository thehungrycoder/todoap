import dotenv from "dotenv";
import express from "express";
const app = express();
import routes from "./routes";

dotenv.config();
const port = process.env.SERVER_PORT;

routes(app);

// start the server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
