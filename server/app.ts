import express from 'express'
import cors from 'cors'
import dbConnect from './db'
import * as dotenv from 'dotenv'
import routes from './routes/route'
import bodyParser = require('body-parser')
import path from 'path'


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

async function main() {
    await dbConnect();
}
  
main();
app.listen(port)