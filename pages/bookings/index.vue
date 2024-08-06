<script setup lang="ts">
import type {Booking} from "~/types/booking";
import {interval} from "date-fns/interval";
import {intervalToDuration} from "date-fns/intervalToDuration";
import {useErrorHandlers} from "~/composables/error-handlers";

const errorHandlers = useErrorHandlers()
const {data: bookings} = await useFetch<Booking[]>('/api/bookings', {onResponseError: errorHandlers.xhrDefaultErrorHandler})
const bookingIdToCheckout = ref()

const bookingLines = computed(() => {
  return bookings.value?.map(booking => {
    return {
      ...booking,
      duration: intervalToDuration(interval(booking.startTime, booking.endTime)),
    }
  })
})

const confirmCheckout = (bookingId: string) => {
  bookingIdToCheckout.value = bookingId
}
const cancelCheckout = () => {
  bookingIdToCheckout.value = undefined
}

const checkout = async (bookingId: string) => {
  await $fetch<void>(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
    onResponseError: errorHandlers.xhrDefaultErrorHandler
  })
  await refreshNuxtData()
}
</script>

<template>
  <h1 class="page-title">Bookings</h1>

  <PrimeDataTable v-if="bookingLines && bookingLines?.length > 0" :value="bookingLines">
    <PrimeColumn header="Start at">
      <template #body="slotProps">
        {{ formatToShortDateTime(slotProps.data.startTime) }}
      </template>
    </PrimeColumn>
    <PrimeColumn header="Until">
      <template #body="slotProps">
        {{ formatToShortTime(slotProps.data.endTime) }}
      </template>
    </PrimeColumn>
    <PrimeColumn field="duration.hours" header="Duration (hours)"></PrimeColumn>
    <PrimeColumn field="customerName" header="Customer"></PrimeColumn>
    <PrimeColumn field="quantity" header="Board">
      <template #body="slotProps">
        {{ slotProps.data.board.model.name }} ({{ slotProps.data.board.id }})
      </template>
    </PrimeColumn>
    <PrimeColumn style="width: 25%">
      <template #body="slotProps">
        <div class="booking-actions">
          <PrimeButton v-if="bookingIdToCheckout !== slotProps.data.id"
                       @click.prevent="confirmCheckout(slotProps.data.id)"
                       severity="secondary"
                       aria-label="checkout"
                       icon="pi pi-sign-in"/>
          <template v-if="bookingIdToCheckout === slotProps.data.id">
            <PrimeButton @click.prevent="checkout(slotProps.data.id)"
                         label="Confirm checkout ?"/>
            <PrimeButton @click.prevent="cancelCheckout()"
                         label="Cancel"
                         severity="secondary"/>
          </template>
        </div>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
  <span v-else>No booking at the moment.</span>
</template>

<style scoped>
.booking-actions {
  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
}
</style>