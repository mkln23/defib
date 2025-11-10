import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

export const handler: APIGatewayProxyHandler = async event => {
    try {
        // handle both IoT direct invoke & API Gateway style
        const payload = typeof event.body === 'string' ? JSON.parse(event.body) : (event.body ?? event);

        const { deviceId, heartBeat } = payload;
        logger.info('heartBeat');
        logger.info(heartBeat);

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

        const connections = await prisma.webSocketConnection.findMany();
        const endpoint = process.env.WEBSOCKET_API_ENDPOINT ?? '';

        const apiGwClient = new ApiGatewayManagementApiClient({
            endpoint,
        });

        const message = JSON.stringify({
            type: 'iot-update',
            data: record,
        });

        for (const conn of connections) {
            try {
                await apiGwClient.send(
                    new PostToConnectionCommand({
                        ConnectionId: conn.connectionId,
                        Data: Buffer.from(message),
                    }),
                );
            } catch (err) {
                logger.error(`Failed to send to ${conn.connectionId}`);
                logger.error(err);
                // Clean up stale connections
                if ((err as any).statusCode === 410) {
                    await prisma.webSocketConnection.deleteMany({ where: { connectionId: conn.connectionId } });
                }
            }
        }

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
