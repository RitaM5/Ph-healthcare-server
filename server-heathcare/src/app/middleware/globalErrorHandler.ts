import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (envVars.NODE_ENV === 'development') {
        console.log("error fron global error");

    }
    const statusCode: number = status.INTERNAL_SERVER_ERROR;
    const message: string = 'internal server error';

    res.status(statusCode).json({
        success: false,
        message: 'Internal server error',
        error: err.message,
    });
}