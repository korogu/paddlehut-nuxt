import {Booking} from "~/types/booking";

export async function getAllBookings(): Promise<Booking[]> {
    const keys = await useStorage().getKeys("booking")
    return (await useStorage().getItems<Booking>(keys)).map(result => result.value)
}