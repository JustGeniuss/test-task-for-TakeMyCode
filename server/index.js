import express from 'express';
import routes from './router.js';
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();


app.use(express.json());
app.use(cors())
routes(app);



app.listen(process.env.PORT, () => console.log('Server listening on port:' + process.env.PORT ))