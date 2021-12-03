/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-03 00:33:58
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-03 00:59:31
 */
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { redis } from 'redis';

import { AppError } from '../../../errors/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});
const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10, // 10 request
    duration: 5, // 1 second by ip
});

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(req.ip);

        return next();
    } catch (error) {
        throw new AppError('Too many requests', 429);
    }
}
