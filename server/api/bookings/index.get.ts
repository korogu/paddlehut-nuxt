import {getAllBookings} from "~/server/repository/booking.repository";

export default defineEventHandler((event) => {
    return getAllBookings()
})