<script setup lang="ts">
import type {Booking} from "~/types/booking";
import {addHours} from "date-fns/addHours";

const {data: bookings} = await useFetch<Booking[]>('/api/bookings')

const bookingLines = computed(() => {
  return bookings.value?.map(booking => {
    return {...booking, endDate: addHours(booking.startTime, booking.durationInHours)}
  })
})

</script>

<template>
  <h1>Booking</h1>
  <table>
    <thead>
    <tr>
      <th>Start at</th>
      <th>Until</th>
      <th>Customer</th>
      <th>Board</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="bookingLine in bookingLines">
      <td>{{ formatToShortDateTime(bookingLine.startTime) }}</td>
      <td>{{ formatToShortTime(bookingLine.endDate) }}</td>
      <td>{{ bookingLine.customerName }}</td>
      <td>{{ bookingLine.board.model.name }} ({{ bookingLine.board.id }})</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>