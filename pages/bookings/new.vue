<script setup lang="ts">

import type {BoardModel} from "~/types/board-model";
import {startOfHour} from "date-fns/startOfHour";
import {addHours} from "date-fns/addHours";
import type {BookingRequest} from "~/types/booking";
import {date, object, string} from "yup";
import {interval} from "date-fns/interval";
import {useToast} from "primevue/usetoast";

const router = useRouter()
const defaultStartTime = startOfHour(new Date())
const availableModels: Ref<BoardModel[] | null> = ref(null)
const availableDurations: DurationChoice[] = [
  {label: "1h", duration: 1},
  {label: "2h", duration: 2},
  {label: "4h", duration: 4},
  {label: "8h", duration: 8}]

const model = reactive<BookingViewModel>({
  startTime: defaultStartTime,
  duration: availableDurations[0],
  customerName: "",
  boardModel: null
})

const modelValidation = object({
  startTime: date().required("startTimeRequired"),
  duration: object().required("durationRequired"),
  customerName: string().required("customerNameRequired"),
  boardModel: object().required("boardModelRequired")
})
const validationErrors = ref<any>({})
const displayValidationErrors = ref<boolean>(false)
const availabilitiesLoading = ref(false)
const toast = useToast();

const displayAvailabilities = async () => {
  resetChoices()
  await validateModel()

  if (model.startTime && model.duration) {
    const {start: startTime, end: endTime} = getTimeRange()
    availabilitiesLoading.value = true

    await $fetch<BoardModel[]>(`/api/boardmodels?available&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`)
        .then(value => {
          availableModels.value = value
        })
        .catch(reason => {
          // Display error message to user
          toast.add({
            severity: 'error',
            summary: 'Technical error',
            detail: 'An unexpected error occurs. Please try again.',
            group: 'global-notifications',
            life: 3000
          })
        })
        .finally(() => {
          availabilitiesLoading.value = false
          displayValidationErrors.value = false
        })
  }
}

const resetChoices = () => {
  model.boardModel = null
  availableModels.value = null
}

const chooseModel = (selectedModel: BoardModel) => {
  model.boardModel = selectedModel
}

const createBooking = async () => {
  await validateModel()

  if (model.customerName && model.boardModel) {
    const interval = getTimeRange()
    const booking: BookingRequest = {
      modelId: model.boardModel.id,
      customerName: model.customerName,
      startTime: interval.start,
      endTime: interval.end,
    }

    const result = await $fetch('/api/bookings', {method: 'POST', body: booking})
    navigateTo("/bookings")
  }
};

const getTimeRange = () => {
  return interval(model.startTime!!, addHours(model.startTime!!, model.duration.duration!!))
}

const validateModel = async () => {
  displayValidationErrors.value = true

  modelValidation.validate(model, {abortEarly: false})
      .then(() => {
        validationErrors.value = {}
      })
      .catch(reason => {
        validationErrors.value = reason.errors.reduce((validationErrors: any, currentError: any) => {
          validationErrors[currentError] = true
          return validationErrors
        }, {})
      })
}

interface BookingViewModel {
  startTime: Date | null,
  duration: DurationChoice,
  customerName: string,
  boardModel: BoardModel | null
}

interface DurationChoice {
  label: string,
  duration: number
}
</script>

<template>
  <h1 class="page-title">New booking</h1>
  <section id="time-range-selection" class="form-section">
    <div class="form-field">
      <label for="start-time"
             :class="{'validation-error': displayValidationErrors && validationErrors.startTimeRequired}">Start
        time</label>
      <PrimeDatePicker id="start-time" v-model="model.startTime"
                       showTime hourFormat="24"
                       @date-select="validateModel()"
                       :invalid="displayValidationErrors && validationErrors.startTimeRequired"/>
      <span v-if="displayValidationErrors && validationErrors.startTimeRequired" class="validation-error">Start time is mandatory</span>
    </div>

    <div class="form-field">
      <label for="duration">Duration</label>
      <PrimeSelect id="duration" v-model="model.duration" :options="availableDurations" optionLabel="label"/>
    </div>

    <PrimeButton type="button" @click.prevent="displayAvailabilities()"
                 :severity="availableModels ? 'secondary' : 'primary'"
                 :loading="availabilitiesLoading"
                 label="Check availabilities"
                 id="check-availabilities-button"/>
  </section>

  <section id="board-model-selection" v-if="availableModels">
    <span>Model</span>
    <span v-if="availableModels.length === 0">No model available. Try another start time.</span>
    <ul id="available-models" v-if="!model.boardModel">
      <li v-for="boardModel in availableModels">
        <board-model-card :boardModel="boardModel">
          <div class="choose-model-button">
            <PrimeButton @click="chooseModel(boardModel)">Choose</PrimeButton>
          </div>
        </board-model-card>
      </li>
    </ul>
    <board-model-card v-else :boardModel="model.boardModel"/>
  </section>

  <section id="booking-finalization" class="form-section" v-if="model.boardModel">
    <div class="form-field">
      <label for="customer-name"
             :class="{'validation-error': displayValidationErrors && validationErrors.customerNameRequired}">Customer
        name</label>
      <PrimeInputText id="customer-name" maxlength="80" v-model="model.customerName"
                      required="true"
                      aria-required="true"
                      @keyup="validateModel()"
                      :invalid="displayValidationErrors && validationErrors.customerNameRequired"/>
      <span v-if="displayValidationErrors && validationErrors.customerNameRequired" class="validation-error">Customer is mandatory</span>
    </div>
    <PrimeButton @click.prevent="createBooking()">Register this booking</PrimeButton>
  </section>
</template>

<style scoped>
section {
  margin-top: var(--default-spacing);
  display: flex;
  flex-direction: column;
  gap: var(--default-spacing);
}

.form-section {
  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
  align-items: flex-end;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--default-spacing);
}

#check-availabilities-button {
  align-self: flex-end;
}

#available-models {
  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
}

.choose-model-button {
  align-self: flex-end;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.validation-error {
  color: var(--default-error-color);
}

#booking-finalization {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>