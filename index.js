import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
const app = express();

const connectToDB = async() =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        if(db){
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
    }
}

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth/",authRoute);
app.use("/api/user/",userRoute);
app.use("/api/user/post",postRoute);

connectToDB().then( () =>{
    app.listen(8080, () => {
        console.log("app is listing on port 8080");
    });
});    

