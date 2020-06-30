const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const randomFromArray = (array) => {
  const value = Math.floor(Math.random() * array.length);
  return array[value];
};

const randomKey = (obj) => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export { randomNumber, randomFromArray, randomKey };
