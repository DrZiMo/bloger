import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface ICreateLike {
    user_id: number;
    post_id: string;
}

// get all likes
export const getAllLikes = async (req: Request, res: Response) => {
    const like = await prisma.like.findMany()
    try {
        if (like.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "There is no like registered"
            })
        }

        res.status(200).json({
            isSuccess: true,
            like
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
}

//get single like
export const getSingleLike = async (req: Request, res: Response) => {
    try {
        const likeId = req.params.id
        const like = await prisma.like.findFirst({
            where: {
                id: likeId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                }
            }
        })

        if (!like) {
            res.status(404).json({
                isSuccess: false,
                message: "like is not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            like
        })

        return
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
    }

    return
}

// create new like
export const createNewLike = async (req: Request, res: Response) => {
    try {
        const { user_id, post_id } = req.body as ICreateLike

        if (!post_id || !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Fill all the inputs"
            })

            return
        }

        const newLike = await prisma.like.create({
            data: {
                post_id,
                user_id
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: newLike
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

// delete like
export const deleteLike = async (req: Request, res: Response) => {
    try {
        const likeId = req.params.id
        const like = await prisma.like.findFirst({
            where: {
                id: likeId
            }
        })

        if (!like) {
            res.status(404).json({
                isSuccess: false,
                message: "The like is not found"
            })

            return
        }

        const deletedLike = await prisma.like.delete({
            where: {
                id: like.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            comment: deletedLike
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