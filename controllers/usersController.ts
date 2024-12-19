import { Request, Response } from "express";

interface ICreateUsers {
    id: number;
    name: string;
    phone_number: string;
    password: string;
}

let users: ICreateUsers[] = [
    {
        id: 1,
        name: "zuhayb",
        phone_number: "567890",
        password: "123456"
    }
]

export const getAllUsers = (req: Request, res: Response) => {
    try {
        if (users.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "There is no users registered"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            users
        })

        return
    } catch (error) {
        console.log("Error: " + error)

        res.status(500).json({
            isSuccess: false,
            message: "Server Error"
        })

        return
    }

    return
}