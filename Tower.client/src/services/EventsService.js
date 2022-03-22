import { } from "axios"
import { AppState } from "../AppState"
import { api } from "./AxiosService"




class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        AppState.events = res.data
    }

    async getById(id) {
        const res = await api.get('api/events/' + id)
        AppState.activeEvent = res.data
    }

    async create(eventData) {
        const res = await api.post('api/events', eventData)
        AppState.events.push(res.data)

        return res.data
    }

    async edit(eventData) {
        const res = await api.put('api/events/' + eventData.id, eventData)
        AppState.activeEvent = res.data
    }




}

export const eventsService = new EventsService();