import express from "express"
import { TrainModel ,GenerateImage, GenerateImagesFromPack} from "common/types";
import {prismaClient} from 'db';
 
let USER_ID = "1";

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
             bald: parsedBody.bald  ,
             userId:    USER_ID
            }  
})

res.json({
    modelId : data.id,
    message: "Model created successfully"
})
})

app.post("/ai/generate", async(req, res)=> {
    const parsedBody = GenerateImage.parse(req.body);
    if (!parsedBody) {
        res.status(400).json({
            message: "Invalid request body"
        });
        return
    }   
     const data = await prismaClient.outputImages.create({
data: { 
    prompt: parsedBody.prompt,
    userId: USER_ID,
    modelId: parsedBody.modelId,
    imageUrl: "",
}
})
res.json({
    imageId: data.id,
    message: "Image generated successfully"
})
});

app.post("/pack/generate", async(req, res)=> {
    const parsedBody = GenerateImagesFromPack.parse(req.body);
    if (!parsedBody) {
        res.status(400).json({
            message: "Invalid request body"
        });
        return
    }
     const prompt = await prismaClient.packPrompts.findMany({
        where: {    
            packId: parsedBody.packId
        }
    })
    
    const data = await prismaClient.outputImages.createManyAndReturn({   
        data: prompt.map((p)=> {
            return {
                prompt: p.prompt,
                userId: USER_ID,
                modelId: parsedBody.modelId,
                imageUrl: ""
            }
        })
    })

    res.json({
        images: data.map((d)=> d.id),
        message: "Image pack generated successfully"
    })
})
app.get("/pack/bulk", (req, res)=> {
    const packs = prismaClient.packs.findMany({});
    res.json({
        packs
    })
})

app.get("/image/bulk", (req, res)=> {
    const ids = req.query.images as string[];
    const limit = req.query.limit as string || "10";
    const offset = req.query.offset as string || "0";

    const data = prismaClient.outputImages.findMany({
        where: {
            id: {
                in: ids
            },
            userId: USER_ID
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.json({
        images: data
    })
});

app.post("fal-ai/webhook/train", (req, res)=> {
    console.log(req.body);  
    const requestId = req.body.request_id;          

});
app.post("fal-ai/webhook/image", (req, res)=> {
    console.log(req.body);  
    res.json({  
        message: "Webhook received"
    })
})


app.listen(PORT, ()=> {
    console.log("Server is running on port 8080");
    
})