import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface ICreateComment {
    content: string;
    user_id: number;
    post_id: string;
}

interface IUpdateComment {
    comment_id: string;
    content: string;
}

// get all users
export const getAllComment = async (req: Request, res: Response) => {
    const comments = await prisma.comment.findMany()
    try {
        if (comments.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "There is no comments registered"
            })
        }

        res.status(200).json({
            isSuccess: true,
            comments
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

//get single user
export const getSingleComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id
        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        if (!comment) {
            res.status(404).json({
                isSuccess: false,
                message: "Comment is not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            comment
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

// create new user
export const createNewComment = async (req: Request, res: Response) => {
    try {
        const { content, user_id, post_id } = req.body as ICreateComment

        if (!post_id || !content || !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Fill all the inputs"
            })

            return
        }

        const newComment = await prisma.comment.create({
            data: {
                content,
                post_id,
                user_id
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: newComment
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

// delete user
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id
        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId
            }
        })

        if (!comment) {
            res.status(404).json({
                isSuccess: false,
                message: "The comment is not found"
            })

            return
        }

        const deletedComment = await prisma.comment.delete({
            where: {
                id: comment.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            comment: deletedComment
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
export const updateComment = async (req: Request, res: Response) => {
    try {
        const { content, comment_id } = req.body as IUpdateComment

        const comment = await prisma.comment.findFirst({
            where: {
                id: comment_id
            }
        })

        if (!comment) {
            res.status(404).json({
                isSuccess: false,
                message: "comment is not found!"
            })

            return
        }

        const updateComment = await prisma.comment.update({
            where: {
                id: comment.id
            },
            data: {
                content
            }
        })

        res.status(200).json({
            isSuccess: true,
            comment: updateComment
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