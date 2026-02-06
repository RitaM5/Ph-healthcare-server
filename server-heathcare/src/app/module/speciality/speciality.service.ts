import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createSpeciality = async (payload: Specialty): Promise<Specialty> => {
    const speciality = await prisma.specialty.create({
        data: payload
    })

    return speciality;
}

const getAllSpecialities = async (): Promise<Specialty[]> => {
    const specialities = prisma.specialty.findMany();
    return specialities;
}

const deleteSpeciality = async (id: string): Promise<Specialty> => {
    const specialty = prisma.specialty.delete({
        where: { id }
    });
    return specialty;
}
const updateSpeciality = async (id: string, data: Partial<Specialty>): Promise<Specialty> => {
    const specialty = prisma.specialty.update({
        where: { id },
        data
    });
    return specialty;
}

export const SpecialityService = {
    createSpeciality,
    getAllSpecialities,
    deleteSpeciality,
    updateSpeciality
}