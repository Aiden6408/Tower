import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";

class EventService {

    async getAll(query = {}) {
        const towerEvent = await dbContext.TowerEvents.find(query).populate('creator')
        return towerEvent
    }
    async getById(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
        if (!towerEvent) {
            throw new BadRequest('invalid Id')
        }
        return towerEvent
    }
    async create(body) {
        let currentTime = new Date().toLocaleDateString()
        body.startDate = new Date(body.startDate).toLocaleDateString()
        if (body.startDate < currentTime) {
            throw new BadRequest('This Event is in the past.You cannot do this.')
        }

        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator');
        return towerEvent
    }

    async editEvent(newdata, id) {
        const original = await dbContext.TowerEvents.findById(id)
        if (original.creatorId.toString() !== newdata.creatorId) {
            throw new BadRequest('Cant edit this Event')
        }
        if (original.isCanceled == true) {
            throw new BadRequest('can not edit this canceled event')
        }
        original.name = newdata.name ? newdata.name : original.name
        original.description = newdata.description
            ? newdata.description : original.description
        original.coverImg = newdata.coverImg ? newdata.coverImg : original.coverImg
        original.location = newdata.location ? newdata.location : original.location
        original.capacity = newdata.capacity ? newdata.capacity : original.capacity
        original.startDate = newdata.startDate ? newdata.startDate : original.startDate
        original.type = newdata.type ? newdata.type : original.type

        await original.save()
        return original
    }


    async cancel(id, userId) {
        const eventToDelete = await dbContext.TowerEvents.findById(id)
        if (eventToDelete.creatorId.toString() !== userId) {
            throw new BadRequest('You are not authorized to cancel this event.')
        }
        eventToDelete.isCanceled = true
        await eventToDelete.save()
        return eventToDelete
    }



}


export const eventService = new EventService();