<script setup lang="ts">
import type { AgeFilter, GenderFilter, SortKey } from '../types/user'

const gender = defineModel<GenderFilter>('gender', { required: true })
const age = defineModel<AgeFilter>('age', { required: true })
const sort = defineModel<SortKey>('sort', { required: true })

const emit = defineEmits<{
  reset: []
}>()

const genderOptions: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'male', label: 'Чоловіки' },
  { value: 'female', label: 'Жінки' },
]

const ageOptions: { value: AgeFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'adult', label: '18 +' },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Ім\'я ↑' },
  { value: 'name-desc', label: 'Ім\'я ↓' },
  { value: 'age-asc', label: 'Вік ↑' },
  { value: 'age-desc', label: 'Вік ↓' },
]
</script>

<template>
  <div class="toolbar">
    <div class="toolbar__group" role="group" aria-label="Стать">
      <button
        v-for="option in genderOptions"
        :key="option.value"
        type="button"
        :class="{ 'is-active': gender === option.value }"
        @click="gender = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="toolbar__group" role="group" aria-label="Вік">
      <button
        v-for="option in ageOptions"
        :key="option.value"
        type="button"
        :class="{ 'is-active': age === option.value }"
        @click="age = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="toolbar__group" role="group" aria-label="Сортування">
      <button
        v-for="option in sortOptions"
        :key="option.value"
        type="button"
        :class="{ 'is-active': sort === option.value }"
        @click="sort = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <button class="toolbar__reset" type="button" @click="emit('reset')">Очистити все</button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-bottom: 24px;
}

.toolbar__group {
  display: flex;
  gap: 4px;
}

button {
  padding: 6px 14px;
  color: #14213d;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c5d0e6;
  border-radius: 8px;
}

button:hover {
  background: #eaf0fb;
}

button:focus-visible {
  outline: 2px solid #3b76d4;
  outline-offset: 2px;
}

button.is-active {
  color: #fff;
  background: #14213d;
  border-color: #14213d;
}

.toolbar__reset {
  margin-left: auto;
}
</style>
