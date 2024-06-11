import {getAllBoardModels} from "~/server/repository/board-model.repository";

export default defineEventHandler((event) => {
    return getAllBoardModels()
})