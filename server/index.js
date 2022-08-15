import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();
const URL_DB = `${process.env.DB_URL}`
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("welcome to the backend")
})

app.use('/users', userRouter)
app.use('/blogs', postRouter)

// code for connection to database
// chain with .then and .catch because it's a promise function, if this true .then will call our app
mongoose.connect(URL_DB,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT,()=> console.log(`server is running on port ${PORT}`)))
.catch((error)=>console.log(error.message));

//just to make sure to not get any warning in console
// mongoose.set('useFindAndModify',false)
