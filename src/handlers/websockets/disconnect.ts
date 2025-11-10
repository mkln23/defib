import prisma from '@/clients/prisma';
import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async event => {
    const connectionId = event.requestContext.connectionId ?? '';
    if (!connectionId) throw new Error('Missing ConnectionId');

    const connection = await prisma.webSocketConnection.deleteMany({
        where: { connectionId },
    });

    logger.info('Websocket connection deleted');
    logger.info(connection);
    return { statusCode: 200, body: 'Socket Disconnected' };
};
