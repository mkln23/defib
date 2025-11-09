import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hello', async (req: Request, res: Response) => {
    const rows = await prisma.device.findMany()
    logger.info(rows)
    logger.info(`hello lambda`)
    return res.status(200).json({ message: `vanakkam da mapla...aws la irunthu`, rows: rows.length });
});

export default router;
