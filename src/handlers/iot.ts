import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async event => {
    try {
        logger.info('Incoming IoT event:');
        logger.info(event);

        const payload = event.body ? JSON.parse(event.body) : event; // supports direct IoT payloads

        const { deviceId, heartBeat } = payload;

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
