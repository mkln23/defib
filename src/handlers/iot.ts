import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async event => {
    try {
        logger.info('Incoming IoT event:');
        logger.info('event');
        logger.info(event);
        logger.info('event.body');
        logger.info(event.body);
        logger.info('JSON.parse(event.body ?? {} as any)');
        logger.info(JSON.parse(event.body ?? {} as any));
        
        const payload = event.body ? JSON.parse(event.body) : event; // supports direct IoT payloads
        logger.info('payload');
        logger.info(payload);

        const { deviceId, heartBeat } = payload;
        logger.info('deviceId')
        logger.info(deviceId)
        logger.info('heartBeat')
        logger.info(heartBeat)

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
