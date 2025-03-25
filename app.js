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

// Sirve los archivos estáticos de la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Maneja todas las rutas y devuelve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log('Server running on port: ' + PORT));