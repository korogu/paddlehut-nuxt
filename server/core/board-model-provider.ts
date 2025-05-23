import {BoardModel} from "~/models/board-model";
import {getAllBoardModels} from "~/server/repository/board-model.repository";
import {getAvailableModels} from "~/server/core/booking-register";

export async function getBoardModelsMatching(filter: BoardModelFilter): Promise<BoardModel[]> {
    if (hasAvailableFilter(filter)) {
        return getAvailableModels(toTimeRange(filter))
    }

    return getAllBoardModels()
}

export interface BoardModelFilter {
    available?: boolean,
    startTime?: Date,
    endTime?: Date
}

function hasAvailableFilter(filter: BoardModelFilter) {
    return filter.available && filter.startTime && filter.endTime
}

function toTimeRange(filter: BoardModelFilter) {
    return {startTime: filter.startTime!, endTime: filter.endTime!}
}