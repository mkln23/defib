import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: any) => {
    try {
        logger.info('Incoming IoT event:');
        logger.info(event);
        logger.info('Event type:');
        logger.info(typeof event.body);

        // handle both IoT direct invoke & API Gateway style
        const payload = typeof event.body === 'string' ? JSON.parse(event.body) : (event.body ?? event);

        logger.info('Parsed payload:');
        logger.info(payload);

        const { deviceId, heartBeat } = payload;
        logger.info('deviceId', deviceId);
        logger.info('heartBeat', heartBeat);

        if (!deviceId) {
            throw new Error('Missing deviceId in payload');
        }

        // Insert into your DB using Prisma
        const record = await prisma.readings.create({
            data: {
                deviceId,
                heartBeat,
            },
        });

        logger.info('Record inserted:');
        logger.info(record);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data inserted successfully', record }),
        };
    } catch (error) {
        logger.error('Error inserting IoT data:');
        logger.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error }),
        };
    }
};
