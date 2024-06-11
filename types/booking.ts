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
    durationInHours: number
}