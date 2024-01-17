//Importing dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import { DB_NAME } from './constant.js';

//Importing routes
import authRoutes from './routes/auth.js';


//Confirugations
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true }));
app.use(bodyParser.json({limit: "30mb" , extended: true}));

console.log(process.env.MONGO_URL);
//Routes
app.use('/api/auth', authRoutes);
//Database connection 
mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: ${process.env.PORT}`));
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });



