<script setup lang="ts">
import { computed, ref } from 'vue'
import UsersCard from './UsersCard.vue'
import UsersToolbar from './UsersToolbar.vue'
import { users } from '../data/users'
import type { AgeFilter, GenderFilter, SortKey, User } from '../types/user'
import { ADULT_AGE, getAge } from '../utils/age'

const genderFilter = ref<GenderFilter>('all')
const ageFilter = ref<AgeFilter>('all')
const sortKey = ref<SortKey>('default')

function fullName(user: User): string {
  return `${user.name.first} ${user.name.last}`
}

function age(user: User): number {
  return getAge(user.dob.date)
}

const visibleUsers = computed<User[]>(() => {
  const filtered = users.filter(
    (user) =>
      (genderFilter.value === 'all' || user.gender === genderFilter.value) &&
      (ageFilter.value === 'all' || age(user) >= ADULT_AGE),
  )

  // Сортуємо копію, щоб не мутувати вихідний масив і не ламати фільтри
  const sorted = [...filtered]
  switch (sortKey.value) {
    case 'name-asc':
      return sorted.sort((a, b) => fullName(a).localeCompare(fullName(b), 'uk'))
    case 'name-desc':
      return sorted.sort((a, b) => fullName(b).localeCompare(fullName(a), 'uk'))
    case 'age-asc':
      return sorted.sort((a, b) => age(a) - age(b))
    case 'age-desc':
      return sorted.sort((a, b) => age(b) - age(a))
    default:
      return sorted
  }
})

function resetAll(): void {
  genderFilter.value = 'all'
  ageFilter.value = 'all'
  sortKey.value = 'default'
}
</script>

<template>
  <section>
    <UsersToolbar
      v-model:gender="genderFilter"
      v-model:age="ageFilter"
      v-model:sort="sortKey"
      @reset="resetAll"
    />

    <p v-if="visibleUsers.length === 0" class="users__empty">Список юзерів пустий</p>
    <div v-else class="users__grid">
      <UsersCard v-for="user in visibleUsers" :key="user.id" :user="user" />
    </div>
  </section>
</template>

<style scoped>
.users__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 16px;
}

.users__empty {
  padding: 48px 0;
  text-align: center;
  color: #5b6b8c;
}

@media (max-width: 480px) {
  .users__grid {
    grid-template-columns: 1fr;
  }
}
</style>
