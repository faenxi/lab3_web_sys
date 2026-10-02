export const ADULT_AGE = 18

export type AgeCategory = 'minor' | 'young' | 'adult' | 'senior'

export function getAge(isoDate: string, today: Date = new Date()): number {
  const birth = new Date(isoDate)
  const years = today.getFullYear() - birth.getFullYear()
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  return hadBirthday ? years : years - 1
}

export function getAgeCategory(age: number): AgeCategory {
  if (age < ADULT_AGE) return 'minor'
  if (age <= 30) return 'young'
  if (age <= 50) return 'adult'
  return 'senior'
}
