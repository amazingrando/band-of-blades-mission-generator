import { randomNumber, randomFromArray } from "./utilities.js";

const specialistTypes = [
  "Heavy",
  "Medic",
  "Scout",
  "Sniper",
  "Officer",
  "Alchemist or Mercy",
];

const findSpecialist = (hasSpecialist, count) => {
  if (hasSpecialist) {
    return {
      type: randomFromArray(specialistTypes),
      number: randomNumber(1, count),
    };
  } else {
    return false;
  }
};

export { specialistTypes, findSpecialist };
