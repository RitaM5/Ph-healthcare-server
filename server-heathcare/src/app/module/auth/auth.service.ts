//import { Role, User } from "../../../generated/prisma/client";
import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

interface IRegisterPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async(payload: IRegisterPayload) => {
    const {name, email, password} = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // needPasswordChang: false,
            // role: Role.PATIENT (agulo defalut hisebe bose jabe, auth.ts a deya ace)
        }
    });

    if(!data.user){
        throw new Error("Failed to register patient");
    }

    return data.user;

}

interface ILoginUserPayload{
    email: string;
    password: string;
}

const loginUser = async(payload: ILoginUserPayload) => {
    const {email, password} = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    });

    if(data.user.status === UserStatus.BLOCKED){
        throw new Error("user is blocked");
    }
    if(data.user.isDeleted || data.user.status === UserStatus.DELETED){
        throw new Error("user is deleted");
    }

    return data.user;
}

export const authService = {
    registerPatient,
    loginUser
}