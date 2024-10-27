export enum Enviroments {
  production = "Production",
  local = "Local",
}

export enum Sortfields {
  Name = "name",
  Rating = "rating",
}

export enum OrderTypes {
  ASC = "asc",
  DESC = "desc",
}

export const COMMONMATCHLENGTH = 11;

export enum matchesTypes {
  SINGLES = "solo",
  DOUBLES = "dupla",
  VOLEYPONG = "voleipong",
}

export function getRandomInt(max: number = 1, min: number = 0) {
  return Math.random() * (max - min) + min;
}
