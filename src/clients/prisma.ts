import { PrismaClient } from '@prisma/client';

import logger from '@/shared/utils/logger';
import { formatPrismaQuery } from '@/shared/utils/queryFormatter';

const prisma = new PrismaClient({
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'info' },
    ],
    errorFormat: process.env.NODE_ENV === 'prod' ? 'minimal' : 'pretty',
});

prisma.$on('query', e => {
    const formattedQuery = formatPrismaQuery(e);
    logger.debug(`${formattedQuery} (⏱ ${e.duration}ms)`);
});
prisma.$on('error', e => logger.error(e));
prisma.$on('warn', e => logger.warn(e));
prisma.$on('info', e => logger.info(e));

export default prisma;
