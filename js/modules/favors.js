import { randomNumber, randomFromArray } from "./utilities.js";

const favors = ["Holy", "Mystic", "Glory", "Knowledge", "Mercy", "Wild"];

const findFavor = (hasFavor, count) => {
  if (hasFavor) {
    return {
      type: randomFromArray(favors),
      number: randomNumber(1, count),
    };
  } else {
    return false;
  }
};

export { favors, findFavor };
