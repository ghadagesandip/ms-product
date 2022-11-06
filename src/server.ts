import http, { Server} from "http";
import {connect} from "mongoose";

import app from "./app";

let server: Server;
const port = process.env.PORT || 3000;
const mongoUrl:string = process.env.MONGO_URL || '';
server = http.createServer(app);

const startServer = async () => {

    try{
        connect(mongoUrl);
        console.log('Connected to mongodb');
       
    } catch(err){
        console.log('Error connecting mongodb')
    }
    server.listen(port);
}
server.on('listening', ()=>{
    console.log('Server is up and running on port '+ port)

})
startServer();