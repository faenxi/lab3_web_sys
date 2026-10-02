<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../types/user'
import { ADULT_AGE, getAge, getAgeCategory } from '../utils/age'

const props = defineProps<{
  user: User
}>()

const isDetailsVisible = ref(false)

const fullName = computed(() => `${props.user.name.first} ${props.user.name.last}`)
const age = computed(() => getAge(props.user.dob.date))
const ageCategory = computed(() => getAgeCategory(age.value))
const genderLabel = computed(() => (props.user.gender === 'male' ? 'Чоловік' : 'Жінка'))
const birthDate = computed(() => new Date(props.user.dob.date).toLocaleDateString('uk-UA'))

const cardClass = computed(() => ({
  'user-card--minor': ageCategory.value === 'minor',
  'user-card--young': ageCategory.value === 'young',
  'user-card--adult': ageCategory.value === 'adult',
  'user-card--senior': ageCategory.value === 'senior',
}))
</script>

<template>
  <article class="user-card" :class="cardClass">
    <img class="user-card__photo" :src="user.picture" :alt="fullName" width="160" height="160" />

    <div class="user-card__body">
      <h2 class="user-card__name">{{ user.name.title }}. {{ fullName }}</h2>
      <p class="user-card__meta">
        {{ genderLabel }}<span v-if="age >= ADULT_AGE">, {{ age }} років</span>
      </p>

      <dl class="user-card__list">
        <dt>Дата народження</dt>
        <dd>{{ birthDate }}</dd>
        <dt>Адреса</dt>
        <dd>
          {{ user.location.street.number }} {{ user.location.street.name }},
          {{ user.location.city }}, {{ user.location.state }}, {{ user.location.country }},
          {{ user.location.postcode }}
        </dd>
        <dt>Email</dt>
        <dd><a :href="`mailto:${user.email}`">{{ user.email }}</a></dd>
        <dt>Телефон</dt>
        <dd>{{ user.phone }}</dd>
        <dt>Мобільний</dt>
        <dd>{{ user.cell }}</dd>
      </dl>

      <ul class="user-card__hobbies">
        <li v-for="hobby in user.hobbies" :key="hobby" class="user-card__hobby">{{ hobby }}</li>
      </ul>

      <button class="user-card__toggle" type="button" @click="isDetailsVisible = !isDetailsVisible">
        {{ isDetailsVisible ? 'Сховати деталі' : 'Показати деталі' }}
      </button>
      <p v-show="isDetailsVisible" class="user-card__details">{{ user.details }}</p>
    </div>
  </article>
</template>

<style scoped>
.user-card {
  --accent: #5b6b8c;
  --tint: #f1f4fa;
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--tint);
  border: 1px solid #dde4f2;
  border-top: 6px solid var(--accent);
  border-radius: 16px;
}

.user-card--minor {
  --accent: #e8893a;
  --tint: #fff4e8;
}

.user-card--young {
  --accent: #2f9e6b;
  --tint: #e9f7f0;
}

.user-card--adult {
  --accent: #3b76d4;
  --tint: #ebf2fd;
}

.user-card--senior {
  --accent: #8a55c7;
  --tint: #f4edfb;
}

.user-card__photo {
  flex: none;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  background: #dde4f2;
}

.user-card__body {
  min-width: 0;
}

.user-card__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-card__meta {
  margin: 0 0 12px;
  color: #4a5878;
}

.user-card__list {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2px 12px;
  margin: 0 0 12px;
  font-size: 0.9rem;
}

.user-card__list dt {
  color: #5b6b8c;
}

.user-card__list dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.user-card__hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin: 0 0 12px;
  list-style: none;
}

.user-card__hobby {
  padding: 2px 10px;
  font-size: 0.8rem;
  color: #fff;
  background: var(--accent);
  border-radius: 999px;
}

.user-card__toggle {
  padding: 4px 12px;
  color: var(--accent);
  cursor: pointer;
  background: #fff;
  border: 1px solid var(--accent);
  border-radius: 8px;
}

.user-card__details {
  margin: 8px 0 0;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .user-card {
    flex-direction: column;
  }
}
</style>
