import express from 'express'
import ApiRouter from "./routes/api/index.js";
import cors from 'cors'


const port = 9000
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', ApiRouter)


const server = async () => {
    try {
        await app.listen(port, ()=>{
            console.log('server is started on', port)
        })
    } catch (e) {
        console.log(e)
    }
}

server()

