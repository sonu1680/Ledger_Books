import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from  "./routes/loanRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbURL = process.env.DB_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    credentials: false,
  })
);
app.use(express.json());

app.use("/api", router);

mongoose.connect(dbURL).then(()=>{
app.listen(port, () => {
  console.log(`databse connected and listening on port ${port}`);
});

}).catch((err)=>{
        console.log("server connection error");
})

