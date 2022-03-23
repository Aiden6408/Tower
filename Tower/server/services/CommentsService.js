


import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'




class CommentsService {


    async create(body) {
        const Comment = await dbContext.Comments.create(body)
        await Comment.populate('creator')
        return Comment
    }

    async getCommentsByEvent(query = {}) {
        const Comments = await dbContext.Comments.find(query).populate('creator')
        return Comments
    }
    async remove(id, userId) {
        const found = await dbContext.Comments.findById(id)
        if (found.creatorId.toString() !== userId) {
            throw new Forbidden('Not your Comment')
        }
        await dbContext.Comments.findByIdAndDelete(id)
        return found
    }


}














export const commentsService = new CommentsService();