import express from "express"
import { config } from "dotenv"
import cors from "cors"

config();

const PORT= process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/",(req,res) =>{
    res.send(`server is running`);
})

app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`);
})