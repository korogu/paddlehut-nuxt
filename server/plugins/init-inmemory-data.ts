import {Board} from "~/models/board";
import {Booking} from "~/models/booking";
import {randomUUID} from "uncrypto";
import {BoardModel} from "~/models/board-model";
import {setHours} from "date-fns/setHours";
import {startOfHour} from "date-fns/startOfHour";

const fireBoard = {id: "FB", name: "fire board"};
const heavenBoard = {id: "HB", name: "heaven board"}

export default defineNitroPlugin(async (nitroApp) => {
    // Store board models
    await useStorage().setItems<BoardModel>([
        {
            key: "boardmodel:FB",
            value: {
                ...fireBoard, description: "Very fast board, allowing high speed",
                photoUrl: "/img/fireboard.png", boardCount: 3
            }
        },
        {
            key: "boardmodel:HB",
            value: {
                ...heavenBoard, description: "Comfortable board, for a stable experience",
                photoUrl: "/img/heavenboard.png", boardCount: 2
            }
        },
    ])

    // Store boards
    await useStorage().setItems<Board>([
        {key: "board:FB1", value: {id: "FB1", model: fireBoard, bookingCount: 0}},
        {key: "board:FB2", value: {id: "FB2", model: fireBoard, bookingCount: 0}},
        {key: "board:FB3", value: {id: "FB3", model: fireBoard, bookingCount: 0}},
        {key: "board:HB1", value: {id: "HB1", model: heavenBoard, bookingCount: 1}},
        {key: "board:HB2", value: {id: "HB2", model: heavenBoard, bookingCount: 1}}
    ])

    // Store bookings
    const bookingId = randomUUID()
    const anotherBookingId = randomUUID()
    await useStorage().setItems<Booking>([
        {
            key: "booking:" + bookingId,
            value: {
                id: bookingId,
                board: {id: "HB1", model: heavenBoard},
                customerName: 'John Doe',
                startTime: startOfHour(setHours(new Date(), 15)),
                endTime: startOfHour(setHours(new Date(), 17))
            }
        },
        {
            key: "booking:" + anotherBookingId,
            value: {
                id: anotherBookingId,
                board: {id: "HB2", model: heavenBoard},
                customerName: 'Emily Ford',
                startTime: startOfHour(setHours(new Date(), 16)),
                endTime: startOfHour(setHours(new Date(), 17))
            }
        }
    ])
})