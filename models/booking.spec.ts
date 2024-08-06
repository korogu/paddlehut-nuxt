// @vitest-environment node
import {expect, test} from 'vitest'
import type {Booking} from "./booking";
import {isBookingWithin} from "./booking";
import type {TimeRange} from "~/models/time";
import {parseISO} from "date-fns";

test('is booking within given time range', () => {
    const booking: Booking = {
        id: "1",
        customerName: "name",
        board: {id: "b1", model: {id: "md1", name: "md1"}},
        startTime: parseISO("2024-01-02T00:00:00.000"),
        endTime: parseISO("2024-01-02T02:00:00.000")
    }

    const timeRange: TimeRange = {
        startTime: parseISO("2024-01-01T00:00:00.000"),
        endTime: parseISO("2024-01-15T00:00:00.000")
    }
    expect(isBookingWithin(booking, timeRange)).toBeTruthy()
})

test('is booking outside given time range', () => {
    const booking: Booking = {
        id: "1",
        customerName: "name",
        board: {id: "b1", model: {id: "md1", name: "md1"}},
        startTime: parseISO("2024-01-02T00:00:00.000"),
        endTime: parseISO("2024-01-02T02:00:00.000")
    }

    const timeRange = {
        startTime: parseISO("2024-02-01T00:00:00.000"),
        endTime: parseISO("2024-01-15T00:00:00.000")
    }
    expect(isBookingWithin(booking, timeRange)).toBeFalsy()
})