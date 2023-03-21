import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();



router.get('/', (req, res) => { 
    return res.send('casa!');
});

router.post('/teste', (req, res) => { 

    return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };

// console.log(req.params);
// console.log(req.query);
// console.log(req.cookies);
// console.log(req.body);