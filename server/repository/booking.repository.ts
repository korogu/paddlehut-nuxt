import {Booking} from "~/types/booking";
import {randomUUID} from "uncrypto";
import {decrementBookingCount, incrementBookingCount} from "~/server/repository/board.repository";

const STORAGE_KEY = "booking";

export async function getAllBookings(): Promise<Booking[]> {
    const keys = await useStorage().getKeys(STORAGE_KEY)
    return (await useStorage().getItems<Booking>(keys)).map(result => result.value)
}

export async function getBookingsByModel(modelId: string): Promise<Booking[]> {
    const bookings = await getAllBookings()
    return bookings.filter(booking => booking.board.model.id === modelId)
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
    return useStorage().getItem<Booking>(buildKeyWithId(bookingId))
}

export async function addBooking(booking: Omit<Booking, "id">): Promise<Booking> {
    const id = randomUUID()
    const newBooking = {...booking, id: id}

    await useStorage().setItem<Booking>(buildKeyWithId(id), newBooking)
    await incrementBookingCount(booking.board.id)

    return newBooking
}

export async function removeBooking(booking: Booking): Promise<void> {
    await useStorage().removeItem(buildKeyWithId(booking.id))
    await decrementBookingCount(booking.board.id)
}


const buildKeyWithId = (id: string) => `${STORAGE_KEY}:${id}`