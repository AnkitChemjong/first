import Connect from './connection/connect.js';
import Route from './routes/Route.js';
import express from 'express';
import middlewareUser from './middleware/middle.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const App = express();
dotenv.config();
const Port=process.env.PORT;
Connect(process.env.URL||"mongodb://localhost:27017/luserhai").then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log(error));
App.use(bodyParser.json());
App.use(cookieParser())
App.use(express.urlencoded({ extended: false}));
App.use(cors());
App.use(middlewareUser('cook'));

App.use('/',Route);
App.listen(Port,()=>{console.log("Opening the App at Port"+Port);});


