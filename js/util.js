//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    min = Math.abs(min);
  }
  if(max < 0) {
    max = Math.abs(max);
  }
  if (max <= min ) {
    max = min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const getLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;
getLength('Проверка', 24);

//Генерация числа из массива
let RandomNumber;
const getRandomNumber = (min, max) => {
  const arr = [];
  for (let i = min; i < max; i++) {
    RandomNumber = getRandom(min, max);
    if (arr.includes(RandomNumber) === true) {
      i = i - 1;
    } else {
      if (RandomNumber > max === false) {
        arr.push(RandomNumber);
      }
    }
  }
  return RandomNumber;
};
// Функция закрытия окна по Escape
const getEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};

export {getRandom};
export {getRandomNumber};
export {getLength};
export {getEscapeEvent};
