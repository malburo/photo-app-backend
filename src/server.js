import cors from 'cors';
import express from 'express';
import path from 'path';
import { connectDB } from './db';
import MasterRouter from './routes';

require('dotenv').config();
connectDB();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MasterRouter(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
