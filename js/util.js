const ALERT_SHOW_TIME = 5000;

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

//Показ сообщения об отправке с ошибкой на 5 секунд
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция перемешивания массива
const mixPhotosArray = (array) => {
  let k;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    k = Math.floor(Math.random() * (i + 1));
    temp = array[k];
    array[k] = array[i];
    array[i] = temp;
  }
  return array;
};

//Устранение дребезга списка фотографий
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandom, getRandomNumber, getLength, getEscapeEvent, showAlert, mixPhotosArray, debounce};
