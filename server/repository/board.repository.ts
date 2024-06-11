import {Board} from "~/types/board";

export async function getAllBoards(): Promise<Board[]> {
    const keys = await useStorage().getKeys("board")
    let results = await useStorage().getItems<Board>(keys)
    return results.map(result => result.value)
}