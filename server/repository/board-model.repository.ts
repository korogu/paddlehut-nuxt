import {BoardModel} from "~/types/boardmodel";

export async function getAllBoardModels(): Promise<BoardModel[]> {
    const keys = await useStorage().getKeys("boardmodel")
    let results = await useStorage().getItems<BoardModel>(keys)
    return results.map(result => result.value)
}