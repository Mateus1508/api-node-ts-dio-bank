import express from 'express';
import 'reflect-metadata';
import { Response } from 'express';
import { router } from './routes';
import { AppDataSource } from './database';

const server = express();



server.use(express.json());
server.use(router);

server.get('/', (req, res: Response) => {
    return res.status(200).json({message: 'MateusBank'})
});
server.listen(5000, () => console.log('server on'));
