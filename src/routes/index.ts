import * as express from "express";

const route = ( app: express.Application ) => {
    app.get( "/", ( req: any, res ) => {
        res.send( "Hello world!" );
    } );
};

export default route;
