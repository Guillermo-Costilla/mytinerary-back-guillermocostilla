import 'dotenv/config.js';
import './config/db.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import indexRouter from './router/index.router.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', indexRouter);

app.listen(PORT, () => console.log('Server running on port: ' + PORT));