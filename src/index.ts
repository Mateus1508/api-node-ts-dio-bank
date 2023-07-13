import express from 'express';
import { Response } from "express"
import { router } from './routes';

const server = express();

server.use(express.json());
server.use('/', router);
server.listen(5000, () => console.log('server on'));

/* router.get('/', (res: Response) => {
    return res.status(200).json({message: 'MateusBank'})
}); */