import { Auth0Provider } from "@bcwdev/auth0provider";
import { reservationService } from "../services/ReservationService.js";
import BaseController from "../utils/BaseController";

export class ReservationController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.delete)

    }



    async create(req, res, next) {

        try {
            req.body.accountId = req.userInfo.id
            const going = await reservationService.create(req.body)
            return res.send(going)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            await reservationService.delete(req.params.id, req.userInfo.id)
            return res.send('reservation has been withdrawn')
        } catch (error) {
            next(error)
        }
    }
}
