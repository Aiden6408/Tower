
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService {

    async postComment(body) {
        const res = await api.post('api/comments/', body)
        logger.log(res.data)
        AppState.comments = [...AppState.comments, res.data]
    }

    async getTowerEventComments(id) {
        const res = await api.get('api/events/' + id + '/comments')
        AppState.comments = res.data
    }

    async remove(id) {
        await api.delete('api/comments/' + id)
        AppState.comments = AppState.comments.filter(c => c.id !== id)
    }

    async createComment(body) {
        const res = await api.post('api/comments', body)

        AppState.comments.push(res.data)
        logger.log('creating comment', res.data)
        return res.data
    }

}
export const commentsService = new CommentsService()