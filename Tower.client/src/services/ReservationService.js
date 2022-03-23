import { AppState } from "../AppState"
import { api } from "./AxiosService"

class ReservationService {


    async MakeReservation(id) {
        const res = await api.post('api/tickets/', { eventId: id })

        AppState.reservations.unshift(res.data)
        return res.data
    }

    async getEventsReservation(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')

        AppState.reservations = res.data

    }
    async myReservations() {
        const res = await api.get('account/tickets')
        debugger
        AppState.Myreservations = res.data
        AppState.Myreservations.forEach(e => { AppState.myEvents.push(AppState.towerEvents.find(event => event.id == e.id)) })






    }

}
export const reservationService = new ReservationService();