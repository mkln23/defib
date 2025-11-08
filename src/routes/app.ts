import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
    return res.status(200).json({ message: `vanakkam da mapla...aws la irunthu` });
});

export default router;
