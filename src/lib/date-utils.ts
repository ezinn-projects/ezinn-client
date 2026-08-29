export const MIN_MEMBER_AGE = 12;
export const MAX_MEMBER_AGE = 100;

export const isValidCalendarDate = (date: Date): boolean => {
  return !Number.isNaN(date.getTime());
};

export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

export const calculateAge = (birthDate: Date, today = new Date()): number => {
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayHasPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!birthdayHasPassed) age -= 1;
  return age;
};

export const isMemberBirthDateValid = (
  birthDate: Date,
  today = new Date(),
): boolean => {
  if (!isValidCalendarDate(birthDate)) return false;
  const age = calculateAge(birthDate, today);
  return age >= MIN_MEMBER_AGE && age <= MAX_MEMBER_AGE;
};
