import cors from 'cors';
import express from 'express';
import path from 'path';
import { connectDB } from './db';
import Result from './helpers/result.helper';
import MasterRouter from './routes';
import morgan from 'morgan';

require('dotenv').config();
connectDB();

const app = express();
const port = 8000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MasterRouter(app);

app.use(function (err, req, res, next) {
  return Result.error(res, { message: err }, 500);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
