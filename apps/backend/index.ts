import express from "express"
import "./types"
import { TrainModel ,GenerateImage, GenerateImagesFromPack} from "common/types";
import {prismaClient} from 'db'

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.post("/ai/training", async(req, res)=> {
 const parsedBody = TrainModel.parse(req.body);
  
     if (!parsedBody) {
       res.status(400).json({
         message: "Invalid request body" 
        });
        return
}
 const data =   await prismaClient.model.create({
    data: {name : parsedBody.name,
         type: parsedBody.type,
          age: parsedBody.age,
           Ethenecity: parsedBody.Ethenecity,
            eyeColor: parsedBody.eyeColor,
             bald: parsedBody.bald     
            }  
})

res.status(201).json({
    modelId : data.id,
    message: "Model created successfully"
})
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