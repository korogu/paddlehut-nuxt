import {Booking, BookingRequest, isBookingWithin} from "~/models/booking";
import {
    addBooking,
    getAllBookings,
    getBookingById,
    getBookingsByModel,
    removeBooking
} from "~/server/repository/booking.repository";
import {getAllBoardModels, getBoardModelById} from "~/server/repository/board-model.repository";
import {Board} from "~/models/board";
import {BoardModel} from "~/models/board-model";
import {getBoardsByModel} from "~/server/repository/board.repository";
import type {TimeRange} from "~/models/time";


export async function registerNewBooking(bookingRequest: BookingRequest): Promise<Booking> {
    const model = await getBoardModelById(bookingRequest.modelId)

    if (!model) {
        throw createError({statusCode: 400, statusMessage: "Bad model"})
    }

    const boards = await getAvailableBoards(model, bookingRequest)

    if (boards.length === 0) {
        throw createError({statusCode: 400, statusMessage: "Unavailable board"})
    }

    // add new booking
    const board = boards[0]
    return await addBooking({
        startTime: bookingRequest.startTime,
        endTime: bookingRequest.endTime,
        customerName: bookingRequest.customerName,
        board: board
    })
}

async function getAvailableBoards(model: BoardModel, timeRange: TimeRange): Promise<Board[]> {
    const boards = await getBoardsByModel(model.id)
    const bookedBoardIds = (await getBookingsByModel(model.id))
        .filter(booking => isBookingWithin(booking, timeRange))
        .map(booking => booking.board.id)

    return boards.filter(board => bookedBoardIds.indexOf(board.id) === -1)
}

export async function getAvailableModels(timeRange: TimeRange) {
    const allBookings = await getAllBookings()
    const bookingsByModel = groupBookingsByModelId(allBookings.filter(item => isBookingWithin(item, timeRange)))

    return (await getAllBoardModels()).map(model => {
        const modelBookings = bookingsByModel.get(model.id) || []
        model.boardCount = model.boardCount - modelBookings.length
        return model
    }).filter(model => model.boardCount > 0)
}

function groupBookingsByModelId(booking: Booking[]): Map<string, Booking[]> {
    return booking.reduce<Map<string, Booking[]>>((modelMap, currentBooking) => {
        const modelId = currentBooking.board.model.id
        const bookings = modelMap.get(modelId) || []
        bookings.push(currentBooking)
        modelMap.set(modelId, bookings)

        return modelMap
    }, new Map<string, Booking[]>())
}

export async function checkOut(bookingId: string) {
    const booking = await getBookingById(bookingId)

    if (!booking) {
        throw createError({statusCode: 400, statusMessage: "Unknown booking"})
    }

    return removeBooking(booking)
}