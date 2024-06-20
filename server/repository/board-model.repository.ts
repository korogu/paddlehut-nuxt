import {BoardModel} from "~/types/board-model";

export async function getAllBoardModels(): Promise<BoardModel[]> {
    const keys = await useStorage().getKeys("boardmodel")
    return (await useStorage().getItems<BoardModel>(keys)).map(item => item.value)
}

export async function getBoardModelById(id: string): Promise<BoardModel | null> {
    const key = `boardmodel:${id}`
    return await useStorage().getItem<BoardModel>(key)
}