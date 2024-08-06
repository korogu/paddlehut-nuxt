import {interval} from "date-fns/interval";
import {isWithinInterval} from "date-fns/isWithinInterval";
import {isEqual} from "date-fns/isEqual";
import type {TimeRange} from "~/models/time";

export interface Booking {
    id: string,
    board: {
        id: string,
        model: {
            id: string,
            name: string
        }
    }
    customerName: string,
    startTime: Date,
    endTime: Date
}

export function isBookingWithin(booking: Booking, timeRange: TimeRange) {
    const bookingInterval = interval(timeRange.startTime, timeRange.endTime)
    return (isWithinInterval(booking.startTime, bookingInterval) && !isEqual(booking.startTime, bookingInterval.end))
        || (isWithinInterval(booking.endTime, bookingInterval) && !isEqual(booking.endTime, bookingInterval.start))
}

export interface BookingRequest {
    modelId: string,
    customerName: string,
    startTime: Date,
    endTime: Date,
}