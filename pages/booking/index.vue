<script setup lang="ts">
import type {Booking} from "~/types/booking";
import {interval} from "date-fns/interval";
import {intervalToDuration} from "date-fns/intervalToDuration";

const {data: bookings} = await useFetch<Booking[]>('/api/bookings')

const bookingLines = computed(() => {
  return bookings.value?.map(booking => {
    return {...booking, duration: intervalToDuration(interval(booking.startTime, booking.endTime))}
  })
})

const checkOut = async (bookingId: string) => {
  await $fetch<void>(`/api/bookings/${bookingId}`, {method: 'DELETE'})
  await refreshNuxtData()
}
</script>

<template>
  <h1>Booking</h1>
  <NuxtLink to="/booking/new">
    <button>Create new</button>
  </NuxtLink>
  <table>
    <thead>
    <tr>
      <th>Start at</th>
      <th>Until</th>
      <th>Duration</th>
      <th>Customer</th>
      <th>Board</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="bookingLine in bookingLines">
      <td>{{ formatToShortDateTime(bookingLine.startTime) }}</td>
      <td>{{ formatToShortTime(bookingLine.endTime) }}</td>
      <td>{{ bookingLine.duration.hours }}h</td>
      <td>{{ bookingLine.customerName }}</td>
      <td>{{ bookingLine.board.model.name }} ({{ bookingLine.board.id }})</td>
      <td>
        <button @click.prevent="checkOut(bookingLine.id)">Return</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>