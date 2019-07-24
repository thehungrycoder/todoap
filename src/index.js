import bodyParser from "body-parser";
import config from "config";
import express from "express";
import mongooseConnect from "./mongoose";
const app = express();
import routes from "./routes";

mongooseConnect();
const port = config.get('SERVER_PORT');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// start the server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

export default app;
