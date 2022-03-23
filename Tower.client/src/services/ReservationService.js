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
        AppState.myreservations = res.data.map(d => d.event)






    }

}
export const reservationService = new ReservationService();