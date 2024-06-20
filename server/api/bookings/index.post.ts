import {BookingRequest} from "~/types/booking";
import {registerNewBooking} from "~/server/core/booking-register";

export default defineEventHandler(async (event) => {
    const bookingRequest = await readBody<BookingRequest>(event)
    return registerNewBooking(bookingRequest)
})