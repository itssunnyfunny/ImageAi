import express from "express"
import { TrainModel } from "common/types";

const app = express();

const PORT = process.env.PORT || 8080;

app.post("/ai/training", (req, res)=> {

})
app.post("/ai/generate", (req, res)=> {
    
})
app.post("/pack/generate", (req, res)=> {
    
})
app.get("/pack/bulk", (req, res)=> {
    
})

app.get("/image", (req, res)=> {
    
})

app.listen(PORT, ()=> {
    console.log("Server is running on port 8080");
    
})