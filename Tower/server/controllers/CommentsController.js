import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:Id', this.remove)

    }


    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const Comment = await commentsService.create(req.body)
            return res.send(Comment)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await commentsService.remove(req.params.commentId, req.userInfo.id)
            return res.send('deleted')
        } catch (error) {
            next(error)
        }
    }
}

