const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomKey = (obj) => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export { randomNumber, randomFromArray, randomKey };
