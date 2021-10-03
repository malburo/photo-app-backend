import cors from 'cors';
import express from 'express';
import path from 'path';
import { connectDB } from './db/index.js';
import Result from './helpers/result.helper.js';
import MasterRouter from './routes/index.js';
import morgan from 'morgan';
import cloudinary from './config/cloudinary.config.js';

require('dotenv').config();
connectDB();
cloudinary.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MasterRouter(app);

app.use(function (err, req, res, next) {
  return Result.error(res, { message: err.message }, 500);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
