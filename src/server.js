import express from 'express';
import cors from 'cors';
import routes from './routes';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import 'dotenv/config';
import populator from './populator';

require('./sequelize/models/models')   

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


async function getApi() {
    // await populator.getAbilities()
    // await populator.getEvolutionsChain()
    // await populator.getTypes()
    // await populator.getPokemons()
    await populator.main()
}
getApi()

routes(app);
app.use((req, res) => {
    res.status(404).send('Pagina web nao encontrada!')
    
});

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000!`);
});