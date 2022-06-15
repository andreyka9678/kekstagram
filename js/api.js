import {showAlert} from './util.js';
const Url = {
  GET: 'https://25.javascript.pages.academy/kekstagram/data',
  SEND: 'https://25.javascript.pages.academy/kekstagram'
};

// Отправляем запрос на сервер
const getData = (onSuccess) => {
  fetch(Url.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных с сервера : - (');
    });
};

// Отправляем данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SEND,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess(true);
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
