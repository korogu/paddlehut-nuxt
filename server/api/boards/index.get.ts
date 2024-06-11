import {getAllBoards} from "~/server/repository/board.repository";

export default defineEventHandler((event) => {
    return getAllBoards()
})