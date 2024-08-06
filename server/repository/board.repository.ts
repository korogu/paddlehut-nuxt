import {Board} from "~/models/board";

const STORAGE_KEY = "board";

export async function getAllBoards(): Promise<Board[]> {
    const keys = await useStorage().getKeys(`${STORAGE_KEY}`)
    let results = await useStorage().getItems<Board>(keys)
    return results.map(result => result.value)
}

export async function getBoardsByModel(modelId: string): Promise<Board[]> {
    const boards = await getAllBoards()
    return boards.filter(value => value.model.id === modelId)
}

export async function incrementBookingCount(boardId: string) {
    const board = await useStorage().getItem<Board>(buildKeyWithId(boardId))
    if (board) {
        board.bookingCount += 1
        await saveBoard(board)
    }
}

export async function decrementBookingCount(boardId: string) {
    const board = await useStorage().getItem<Board>(buildKeyWithId(boardId))
    if (board) {
        board.bookingCount -= 1
        await saveBoard(board)
    }
}

export async function saveBoard(board: Board) {
    await useStorage().setItem<Board>(`board:${board.id}`, board)
}

const buildKeyWithId = (id: string) => `${STORAGE_KEY}:${id}`