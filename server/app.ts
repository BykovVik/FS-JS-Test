import express from 'express'
import dbConnect from './db'
import * as dotenv from 'dotenv'
import routes from './routes/route'

dotenv.config()

const app = express()
app.use(routes)
const port = process.env.PORT

async function main() {
    await dbConnect();
}
  
main();

app.listen(port)