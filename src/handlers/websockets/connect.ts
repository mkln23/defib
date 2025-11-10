import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async event => {
    const connectionId = event.requestContext.connectionId ?? '';
    if (!connectionId) throw new Error('Missing ConnectionId');

    const connection = await prisma.webSocketConnection.create({
        data: { connectionId },
    });

    logger.info('New websocket connection created');
    logger.info(connection);
    return { statusCode: 201, body: 'Socket Connected' };
};
