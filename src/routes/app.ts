import { Router, Request, Response } from 'express';

const router = Router();

router.post('/hello', (req: Request, res: Response) => {
    console.log(req.body);
    return res.status(200).json({ message: `hello ${req.body.name}` });
});

export default router;
