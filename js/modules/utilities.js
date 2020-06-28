const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const randomFromArray = (array) => {
  console.log(`array.length is ${array.length}`);
  const value = Math.floor(Math.random() * array.length);
  console.log(`value is ${value}`);
  return array[value];
};

const randomKey = (obj) => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export { randomNumber, randomFromArray, randomKey };
