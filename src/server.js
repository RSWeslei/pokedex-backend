import express from 'express';
import cors from 'cors';
import routes from './routes';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import 'dotenv/config';

require('./models/index')   

const app = express();
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../access.log'),
    { flags: 'a' }
);

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
}

app.use(cors(corsOptions))

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

routes(app);
app.use((req, res) => {
    res.status(404).send('Página web não encontrada!')
});

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000!`);
});