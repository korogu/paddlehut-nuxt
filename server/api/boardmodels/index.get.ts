import {QueryObject} from "ufo";
import {BoardModelFilter, getBoardModelsMatching} from "~/server/core/board-model-provider";

export default defineEventHandler((event) => {
    return getBoardModelsMatching(toFilter(getQuery(event)))
})

function toFilter(query: QueryObject): BoardModelFilter {
    const filter: BoardModelFilter = {}

    if (query.available !== undefined) {
        filter.available = true
    }
    if (query.startTime) {
        filter.startTime = new Date(query.startTime.toString())
    }
    if (query.endTime) {
        filter.endTime = new Date(query.endTime.toString())
    }

    return filter
}