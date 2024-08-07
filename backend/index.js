import Connect from './connection/connect.js';
import Route from './routes/Route.js';
import express from 'express';
import middlewareUser from './middleware/middle.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
// import './pass/pass.js';

const App = express();
dotenv.config();
const Port=process.env.PORT;
Connect(process.env.URL||"mongodb://localhost:27017/luserhai").then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log(error));
App.use(bodyParser.json());
App.use(cookieParser())
App.use(express.urlencoded({ extended: false}));
// App.use(passport.initialize());
// App.use(passport.session({}));
// App.use(session({
//     secret: 'your_secret_key', // Replace with your own secret key
//     reSave: false,
//     //store:MongoStore.connect({mongoUrl:'mongodb://localhost:27017/luserhai',collectionName:'sessions'}),
//     saveUninitialized: true,
//     cookie: { maxAge:1000*60*60*24 } // Set to true if using HTTPS
//   }));
App.use(cors({
    origin:process.env.FRONT,
    method:['GET','POST','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}));
App.use(middlewareUser('cook'));

App.use('/',Route);
App.listen(Port,()=>{console.log("Opening the App at Port"+Port);});


