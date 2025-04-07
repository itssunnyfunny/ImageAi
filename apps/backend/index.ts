import express from "express"
import { TrainModel ,GenerateImage, GenerateImagesFromPack} from "common/types";
import {prismaClient} from 'db';
import { FalAiModel } from "./Models/FalAiModel";
import { S3Client } from "bun";
 
let USER_ID = "1";
const falAiModel = new FalAiModel();
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get("/pre-signed-url", async(req, res)=> {
    const key = `models/${Date.now()}_${Math.random()}.zip`
  const url =  S3Client.presign(key, {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
    expiresIn: 60 * 5, // 5 minutes
} )
    res.json({
        url,
        key
    })
    } ) 

app.post("/ai/training", async(req, res)=> {
 const parsedBody = TrainModel.parse(req.body);
  const  images = req.body.images;
  
     if (!parsedBody) {
       res.status(400).json({
         message: "Invalid request body" 
        });
        return
}


 const{request_id}= await falAiModel.trainModel( parsedBody.zipUrl,parsedBody.name );

 const data =   await prismaClient.model.create({
    data: {name : parsedBody.name,
         type: parsedBody.type,
          age: parsedBody.age,
           Ethenecity: parsedBody.Ethenecity,
            eyeColor: parsedBody.eyeColor,
             bald: parsedBody.bald  ,
             userId:    USER_ID,
             falAiRequestId: request_id,
             zipUrl: parsedBody.zipUrl
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
    } ;
    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.modelId,
            userId: USER_ID
        }
    });
    if (!model || !model.tensorPath) {
        res.status(404).json({
            message: "Model not found"
        });
        return
    }


    const {request_id} = await falAiModel.generateImage(parsedBody.prompt, model.tensorPath);
     const data = await prismaClient.outputImages.create({
data: { 
    prompt: parsedBody.prompt,
    userId: USER_ID,
    modelId: parsedBody.modelId,
    imageUrl: "",
    falAiRequestId: request_id,
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
     const prompts = await prismaClient.packPrompts.findMany({
        where: {    
            packId: parsedBody.packId
        }
    })

    let requestIds: {request_id: string}[] = await Promise.all(prompts.map( (p)=> falAiModel.generateImage(p.prompt, parsedBody.modelId)));
    
    const data = await prismaClient.outputImages.createManyAndReturn({   
        data: prompts.map((p)=> {
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

app.post("fal-ai/webhook/train", async(req, res)=> {
    console.log(req.body);  
    const requestId = req.body.request_id; 
           await prismaClient.model.updateManyAndReturn({
            where: { falAiRequestId: requestId },
            data: { 
                 tensorPath: req.body.tensor_path,
                 status: "Generated",
             }

});

    res.json({  
        message: "Webhook received"
    })
}
)
app.post("fal-ai/webhook/image", async (req, res)=> {
    console.log(req.body);  
    const requestId = req.body.request_id; 
           await prismaClient.outputImages.updateManyAndReturn({
            where: { falAiRequestId: requestId },
            data: {
                 imageUrl: req.body.image_url,
                 status: "Generated",
             }
});
    res.json({  
        message: "Webhook received"
    })
})


app.listen(PORT, ()=> {
    console.log("Server is running on port 8080");
    
})