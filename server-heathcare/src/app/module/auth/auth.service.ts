//import { Role, User } from "../../../generated/prisma/client";
import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async (payload: IRegisterPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // needPasswordChang: false,
            // role: Role.PATIENT (agulo defalut hisebe bose jabe, auth.ts a deya ace)
        }
    });

    if (!data.user) {
        throw new Error("Failed to register patient");
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email,
                }
            })
            return patientTx;
        })

        return {
            ...data,
            patient,
        }
    } catch (error) {
        console.log("Transaction error :", error);
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
        throw error;

    }

}

interface ILoginUserPayload {
    email: string;
    password: string;
    name: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    });

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("user is blocked");
    }
    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("user is deleted");
    }

    //create patient profile in transaction after signup of patient in user model

    return data;
}

export const authService = {
    registerPatient,
    loginUser
}