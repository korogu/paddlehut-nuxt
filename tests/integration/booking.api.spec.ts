import {describe, expect, test} from 'vitest'
import {setup, url} from "@nuxt/test-utils";
import type {Booking} from "~/models/booking";

describe('Booking API', async () => {
    await setup({})

    test('get available bookings', async () => {
        const response = await fetch(url('/api/bookings'))
        const bookings: Booking[] = await response.json()
        expect(bookings.length).toBe(2)
    })
})