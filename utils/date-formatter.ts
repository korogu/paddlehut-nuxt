import {format} from "date-fns/format";

export const formatToShortDateTime = (date: Date) => {
    return format(date, "dd/MM/yyyy kk:mm");
}

export const formatToShortTime = (date: Date) => {
    return format(date, "kk:mm");
}
