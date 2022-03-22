import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { ReservationSchema } from "../models/Reservations"




class ReservationService {

    async getResByEvent(id) {

        const reservationsByEvent = await dbContext.Reservations.find({ eventId: id }).populate('account')
        return reservationsByEvent.map(mongooseDocument => {
            const reservationByEvent = mongooseDocument.toJSON()
            return {
                ticketId: reservationByEvent.id,
                eventId: reservationByEvent.eventId,
                ...reservationByEvent.account
            }

        })
    }
    async getMyRes(id) {
        const Myreservations = await dbContext.Reservations.find(id).populate('event')
        return Myreservations.map(mongooseDocument => {
            const Myreservation = mongooseDocument.toJSON()
            return {
                ticketId: Myreservation.id,
                accountId: Myreservation.accountId,
                ...Myreservation.event

            }
        })
    }
    async create(reservation) {

        const currentreservation = await dbContext.TowerEvents.findById(reservation.eventId)
        if (currentreservation.capacity <= 0) {
            throw new BadRequest('You cannot do that!')
        }
        currentreservation.capacity--
        const createreservation = await dbContext.Reservations.create(reservation)
        await currentreservation.save()
        await createreservation.populate('account', 'name', 'description')
        return createreservation
    }

    async delete(id, userId) {
        const original = await dbContext.Reservations.findById(id)
        const towerEvent = await dbContext.TowerEvents.findById(original.eventId)
        towerEvent.capacity++

        if (original.accountId.toString() !== userId) {
            throw new BadRequest('could not remove attendance')
        }
        await towerEvent.save()
        await original.remove()
        return original
    }












}
export const reservationService = new ReservationService()