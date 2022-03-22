


import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'




class CommentsService {

    async create(body) {
        const userComment = await dbContext.Comments.create(body)
        await userComment.populate('creator')
        return userComment
    }

    async getCommentsByEvent(query = {}) {
        const towerEventComments = await dbContext.Comments.find(query).populate('creator')
        return towerEventComments
    }

    async delete(user) {
        const userInfo = await dbContext.Comments.findById(user.commentId)
        if (userInfo.creatorId.toString() !== user.accountId) {
            throw new Forbidden('Invalid request!')
        }
        await dbContext.Comments.findByIdAndDelete(user.commentId)



    }
}












export const commentsService = new CommentsService();