/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await SpecialityService.createSpeciality(payload);
        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'speciality created successfully',
            data: result
        });
    }
)

const getAllSpecialities = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecialityService.getAllSpecialities();
        sendResponse(res, {
            httpStatusCode:200,
            success: true,
            message: 'specialities fetched successfully',
            data: result
        });
    }
)

const deleteSpeciality = catchAsync(
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const result = await SpecialityService.deleteSpeciality(id as string);
        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'speciality deleted successfully',
            data: result
        });

    }
)

const updateSpeciality = catchAsync(
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const payload = req.body;

        const result = await SpecialityService.updateSpeciality(
            id as string,
            payload
        );
        res.status(201).json({
            success: true,
            message: 'speciality updated successfully',
            data: result
        });
    }
)

export const SpecialityController = {
    createSpeciality,
    getAllSpecialities,
    deleteSpeciality,
    updateSpeciality
}