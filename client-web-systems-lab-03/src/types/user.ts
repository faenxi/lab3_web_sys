export type Gender = 'male' | 'female'

export type GenderFilter = 'all' | Gender
export type AgeFilter = 'all' | 'adult'
export type SortKey = 'default' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'

export interface User {
  id: number
  gender: Gender
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: { number: number; name: string }
    city: string
    state: string
    country: string
    postcode: number
  }
  email: string
  dob: { date: string }
  phone: string
  cell: string
  picture: string
  hobbies: string[]
  details: string
}
