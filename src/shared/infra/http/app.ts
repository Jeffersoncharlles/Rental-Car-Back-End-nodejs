/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-03 00:58:26
 */
import 'dotenv/config';
import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '../../container';
import upload from '../../../config/upload';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes';

// chamando o create connection alterado
createConnection();
const app = express();

// app.use(rateLimiter);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: 'Error',
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };
