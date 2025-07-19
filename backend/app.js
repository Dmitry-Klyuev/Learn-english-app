import express from 'express'
import ApiRouter from "./routes/api/index.js";
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3010
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', ApiRouter)
app.use(express.static(join(__dirname, 'public')));
app.get('/:id', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

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

