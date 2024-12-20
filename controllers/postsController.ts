import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface ICreatePosts {
    title: string;
    content: string;
    user_id: number;
}

interface IUpdatePost {
    post_id: string;
    title: string;
    content: string;
}

// get all users
export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        include: {
            _count: {
                select: {
                    Comment: true
                }
            },
            Comment: {
                select: {
                    id: true,
                    content: true
                }
            },
            Like: true,
            Reaction: true
        }
    })
    try {
        if (posts.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "There is no posts registered"
            })
        }

        res.status(200).json({
            isSuccess: true,
            posts
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
export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            },
            include: {
                _count: {
                    select: {
                        Comment: true
                    }
                },
                Comment: {
                    select: {
                        id: true,
                        content: true
                    }
                },
                Like: true,
                Reaction: true
            }
        })

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "User is not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            post
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
export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { title, content, user_id } = req.body as ICreatePosts

        if (!title || !content || !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Fill all the inputs"
            })

            return
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                user_id
            }
        })

        res.status(200).json({
            isSuccess: true,
            user: newPost
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
export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "The post is not found"
            })

            return
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: post.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            post: deletedPost
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
export const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content, post_id } = req.body as IUpdatePost

        const post = await prisma.post.findFirst({
            where: {
                id: post_id
            }
        })

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post is not found!"
            })

            return
        }

        const updatePost = await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                title,
                content,
            }
        })

        res.status(200).json({
            isSuccess: true,
            post: updatePost
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