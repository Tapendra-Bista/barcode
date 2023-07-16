import express from "express"
import { createCanvas } from "canvas"
import  dotenv from "dotenv/config"
import barcode from "jsbarcode"
import https from "https"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
const app = express()
app.use(express.json())
const port = process.env.PORT||'3000'
// __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.post("/barcode",(req,res)=>{
const {text} = req.body;
if(text){
const canvas = createCanvas();
barcode(canvas,req.body.text,{
displayValue:true,
fontSize:19,
format:"CODE128",
margin:2
})
res.type('image/png')
const stream = canvas.createPNGStream()
stream.pipe(res)
} else{
 return   res.status(200).json({message : "Please Enter text to make barcode !"})
}
})

https.createServer({
    key:fs.readFileSync(path.join(__dirname,"./security/key.pem"))
,cert:fs.readFileSync(path.join(__dirname,"./security/cert.pem"))
},app).listen(port,()=>{
    console.log("Listennig at port :"+port)
})




