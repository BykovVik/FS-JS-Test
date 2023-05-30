import express from 'express'
import cors from 'cors'
import dbConnect from './db'
import * as dotenv from 'dotenv'
import routes from './routes/route'
import bodyParser = require('body-parser')
import isLoggedIn from './routes/req_middleware'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(isLoggedIn)
app.use(routes)


async function main() {
    await dbConnect();
}
  
main();

app.listen(port)