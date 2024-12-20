import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface ICreateUsers {
    name: string;
    phone_number: string;
    password: string;
}

interface IUpdateUser {
    user_id: number;
    name: string;
    phone_number: string;
    password: string;
}

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            _count: {
                select: {
                    Post: true,
                    Like: true,
                    Comment: true,
                    Reaction: true
                }
            },
            Post: {
                select: {
                    id: true,
                    title: true,
                    content: true
                }
            },
            Like: {
                select: {
                    id: true,
                    user_id: true,
                    post_id: true
                }
            },
            Reaction: true,
            Comment: {
                select: {
                    id: true,
                    content: true,
                    post_id: true
                }
            }
        }
    })
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

//get single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await prisma.user.findFirst({
            where: {
                id: +userId
            },
            include: {
                _count: {
                    select: {
                        Post: true,
                        Like: true,
                        Comment: true,
                        Reaction: true
                    }
                },
                Post: {
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                },
                Like: {
                    select: {
                        id: true,
                        user_id: true,
                        post_id: true
                    }
                },
                Reaction: true,
                Comment: {
                    select: {
                        id: true,
                        content: true,
                        post_id: true
                    }
                }
            }
        })

        if (!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User is not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            user
        })
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
    }

    return
}

// create new user
export const createNewUser = async (req: Request, res: Response) => {
    try {
        const { name, phone_number, password } = req.body as ICreateUsers

        if (!name || !phone_number || !password) {
            res.status(400).json({
                isSuccess: false,
                message: "Fill all the inputs"
            })

            return
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                phone_number,
                password
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: newUser
        })
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
    }

    return
}

// delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await prisma.user.findFirst({
            where: {
                id: +userId
            }
        })

        if (!user) {
            res.status(404).json({
                isSuccess: false,
                message: "The user is not found"
            })

            return
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: deletedUser
        })

        return
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })

        return
    }
}

//update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { user_id, name, phone_number, password } = req.body as IUpdateUser

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User is not found!"
            })

            return
        }

        const updateUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name,
                phone_number,
                password
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: updateUser
        })
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
    }

    return
}