import Connect from './connection/connect.js';
import Route from './routes/Route.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const App = express();
const Port=process.env.PORT;
Connect(process.env.URL||"mongodb://localhost:27017/luserhai").then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log(error));
App.use(bodyParser.json());
App.use(express.urlencoded({ extended: false}));
App.use(cors());

App.use('/',Route);
App.listen(Port,()=>{console.log("Opening the App at Port"+Port);});


