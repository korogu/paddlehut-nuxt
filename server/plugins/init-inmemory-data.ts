import {Board} from "~/types/board";
import {Booking} from "~/types/booking";
import {randomUUID} from "uncrypto";
import {BoardModel} from "~/types/board-model";

const fireBoard = {id: "FB", name: "fire board"};
const heavenBoard = {id: "HB", name: "heaven board"}

export default defineNitroPlugin(async (nitroApp) => {
    // Store board models
    await useStorage().setItems<BoardModel>([
        {key: "boardmodel:FB", value: {...fireBoard, boardCount: 3}},
        {key: "boardmodel:HB", value: {...heavenBoard, boardCount: 2}},
    ])

    // Store boards
    await useStorage().setItems<Board>([
        {key: "board:FB1", value: {id: "FB1", model: fireBoard, bookingCount: 1}},
        {key: "board:FB2", value: {id: "FB2", model: fireBoard, bookingCount: 0}},
        {key: "board:FB3", value: {id: "FB3", model: fireBoard, bookingCount: 0}},
        {key: "board:HB1", value: {id: "HB1", model: heavenBoard, bookingCount: 0}},
        {key: "board:HB2", value: {id: "HB2", model: heavenBoard, bookingCount: 0}}
    ])

    // Store bookings
    const bookingId = randomUUID()
    await useStorage().setItems<Booking>([
        {
            key: "booking:" + bookingId,
            value: {
                id: bookingId,
                board: {id: "FB1", model: fireBoard},
                customerName: 'John Doe',
                startTime: new Date(Date.UTC(2024, 1, 15, 16, 0, 0)),
                durationInHours: 2
            }
        }
    ])
})