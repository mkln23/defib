import logger from '@/shared/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async event => {
    logger.info(`Default WebSocket event: ${event}`);
    return { statusCode: 201, body: 'Socket Connected' };
};
