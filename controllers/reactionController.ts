import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface ICreateReaction {
    reaction_type: string,
    user_id: number,
    post_id: string
}

interface IUpdateReaction {
    reaction_id: string;
    reaction_type: string,
}

// get all reactions
export const getAllReactions = async (req: Request, res: Response) => {
    const reactions = await prisma.reaction.findMany({
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    user_id: true
                }
            }
        }
    })
    try {
        if (reactions.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "There is no reactions registered"
            })
        }

        res.status(200).json({
            isSuccess: true,
            reactions
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

//get single reaction
export const getSingleReaction = async (req: Request, res: Response) => {
    try {
        const reactionId = req.params.id
        const reaction = await prisma.reaction.findFirst({
            where: {
                id: reactionId
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        user_id: true
                    }
                }
            }
        })

        if (!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction is not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            reaction
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

// create new reaction
export const createNewReaction = async (req: Request, res: Response) => {
    try {
        const { reaction_type, user_id, post_id } = req.body as ICreateReaction

        if (!reaction_type || !user_id || !post_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Fill all the inputs"
            })

            return
        }

        const validReactions = ['LOVE', 'LAUGH', 'ANGRY', 'SAD', 'HAPPY']
        if (!validReactions.includes(reaction_type)) {
            res.status(400).json({
                isSuccess: false,
                message: "in valid reaction type"
            })

            return
        }

        const newReaction = await prisma.reaction.create({
            data: {
                reaction_type,
                user_id,
                post_id
            }
        })

        res.status(200).json({
            isSuccess: true,
            reaction: newReaction
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

// delete reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reactionId = req.params.id
        const reaction = await prisma.reaction.findFirst({
            where: {
                id: reactionId
            }
        })

        if (!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "The reaction is not found"
            })

            return
        }

        const deletedReaction = await prisma.reaction.delete({
            where: {
                id: reaction.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            reaction: deletedReaction
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

//update reaction
export const updateReaction = async (req: Request, res: Response) => {
    try {
        const { reaction_type, reaction_id } = req.body as IUpdateReaction

        const reaction = await prisma.reaction.findFirst({
            where: {
                id: reaction_id
            }
        })

        if (!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "reaction is not found!"
            })

            return
        }

        const validReactions = ['LOVE', 'LAUGH', 'ANGRY', 'SAD', 'HAPPY']
        if (!validReactions.includes(reaction_type)) {
            res.status(400).json({
                isSuccess: false,
                message: "in valid reaction type"
            })

            return
        }

        const updateReaction = await prisma.reaction.update({
            where: {
                id: reaction.id
            },
            data: {
                reaction_type
            }
        })

        res.status(200).json({
            isSuccess: true,
            reaction: updateReaction
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