import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:Id', this.delete)

    }


    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const userComment = await commentsService.create(req.body)
            return res.send(userComment)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            req.body.commentId = req.params.id

            const removedComment = await commentsService.delete(req.body)
            return res.send(removedComment)
        } catch (error) {
            next(error)
        }
    }


}