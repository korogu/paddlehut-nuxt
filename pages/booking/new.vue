<script setup lang="ts">
import type {BoardModel} from "~/types/board-model";
import {startOfHour} from "date-fns/startOfHour";
import {addHours} from "date-fns/addHours";
import type {BookingRequest} from "~/types/booking";

const defaultStartDate = startOfHour(new Date()).toISOString();
const availableModels: Ref<BoardModel[] | null> = ref(null)
const selectedModel: Ref<BoardModel | null> = ref(null)
const startDate = ref(defaultStartDate)
const duration = ref(1)
const customerName = ref("")
const router = useRouter()

const displayAvailableBoardModels = async () => {
  // TODO: form validation stuff
  if (startDate.value && duration.value) {
    const {startDate: rawStartDate, endDate: rawEndDate} = getRawInterval();

    // TODO: handle API errors stuff
    availableModels.value = (await useFetch<BoardModel[]>(`/api/boardmodels?available&startTime=${rawStartDate.toISOString()}&endTime=${rawEndDate.toISOString()}`)).data.value
  }
}

const chooseModel = (model: BoardModel) => {
  selectedModel.value = model
  availableModels.value = null
}

const createBooking = async () => {
  if (selectedModel.value) {
    const interval = getRawInterval()
    const booking: BookingRequest = {
      modelId: selectedModel.value?.id,
      customerName: customerName.value,
      startTime: interval.startDate,
      endTime: interval.endDate,
    }

    const result = await $fetch('/api/bookings', {method: 'POST', body: booking})
    navigateTo("/booking")
  }
};

function getRawInterval() {
  const rawStartDate = new Date(startDate.value);

  return {
    startDate: rawStartDate,
    endDate: addHours(rawStartDate, duration.value)
  }
}
</script>

<template>
  <h1>New booking</h1>
  <form>
    <label for="start-date">Date de début</label>
    <input id="start-date" v-model="startDate">

    <label for="duration">Durée</label>
    <input id="duration" type="number" maxlength="1" max="8" v-model="duration">
    <button @click.prevent="displayAvailableBoardModels()">Voir les disponibilités</button>

    <template v-if="availableModels">
      <h2>Modèles disponibles</h2>
      <ul>
        <li v-for="boardModel in availableModels">
          <board-model-card :boardModel="boardModel"/>
          <button @click="chooseModel(boardModel)">Choisir ce modèle</button>
        </li>
      </ul>
    </template>

    <template v-if="selectedModel">
      <h2>Modèle choisi</h2>
      <board-model-card :boardModel="selectedModel"/>
      <h2>Client</h2>
      <label for="customer-name">Nom</label>
      <input id="customer-name" maxlength="80" v-model="customerName"/>
      <button @click.prevent="createBooking()">Valider la réservation</button>
    </template>
  </form>
</template>

<style scoped>

</style>