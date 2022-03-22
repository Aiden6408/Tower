import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { reservationService } from '../services/ReservationService.js'
import BaseController from '../utils/BaseController'


export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyRes)
  }
  async getMyRes(req, res, next) {
    try {
      const reservations = await reservationService.getMyRes({ accountId: req.userInfo.id })
      return res.send(reservations)
    } catch (error) {
      next(error)
    }
  }
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
