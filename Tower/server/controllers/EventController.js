
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventService } from "../services/eventService";
import { reservationService } from "../services/ReservationService.js";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger"


export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getCommentsByEvent)
            .get('/:id/tickets', this.getresById)

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.editEvent)
            .delete('/:id', this.cancel)


    }
    async getAll(req, res, next) {
        try {
            const towerEvent = await eventService.getAll(req.query)
            return res.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }

    async getresById(req, res, next) {
        try {

            const reservationsById = await reservationService.getResByEvent(req.params.id)
            return res.send(reservationsById)
        } catch (error) {
            next(error)

        }
    }
    async getById(req, res, next) {
        try {
            const towerEvent = await eventService.getById(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await eventService.create(req.body)

            return res.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }

    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const updated = await eventService.editEvent(req.body, req.params.id)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
    async getCommentsByEvent(req, res, next) {
        try {
            const query = req.params.id
            const towerEventComments = await commentsService.getCommentsByEvent({ eventId: query })
            return res.send(towerEventComments)
        } catch (error) {
            next(error)
        }
    }
    async cancel(req, res, next) {
        try {
            await eventService.cancel(req.params.id, req.userInfo.id)
            return res.send('Event has been canceled')
        } catch (error) {
            next(error)
        }
    }


}