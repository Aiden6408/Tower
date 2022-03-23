import { } from "axios"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        AppState.towerEvents = res.data
    }

    async getById(id) {
        const res = await api.get('api/events/' + id)
        AppState.activeEvent = res.data
    }

    async create(eventData) {
        const res = await api.post('api/events', eventData)
        AppState.towerEvents.push(res.data)

        return res.data
    }


    async edit(editedEvent) {
        const res = await api.put('api/events/' + editedEvent.id, editedEvent)
        console.log('editing this event',)
        AppState.activeEvent = res.data

    }

    async deleteEvent(id) {
        const res = await api.delete('api/events/' + id)
        logger.log('canceled event')
        AppState.towerEvents = AppState.towerEvents.filter(t => t.id !== id)
    }
    async getMyreservations() {
        const res = await api.get('account/tickets')
        AppState.myEvents = res.data.map(e => e.event)

    }
}

export const eventsService = new EventsService();