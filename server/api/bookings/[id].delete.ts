import {checkOut} from "~/server/core/booking-register";

export default defineEventHandler((event) => {
    const bookingId = getRouterParam(event, 'id')
    return checkOut(bookingId!)
})