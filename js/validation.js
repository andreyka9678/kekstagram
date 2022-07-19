import {getLength, showAlert} from './util.js';
import {sendData} from './api.js';
import {onSuccessCloseForm, onErrorCloseForm, blockSubmitButton, unblockSubmitButton} from './form.js';

// Поиск классов для ввода текста и комментариев
const uploadFormNode = document.querySelector('.img-upload__form');
const inputHashtagsNode = uploadFormNode.querySelector('.text__hashtags');
const commentTextAreaNode = uploadFormNode.querySelector('.text__description');

// Описание констант
const SPACE_HASHTAG_SEPARATOR = ' ';

// Параметры комментариев
const CommentsFeatures = {
  MAX_LENGTH: 140
};

const HashtagsFeatures = {
  MAX_NUMBER: 5,
  MAX: 20,
  REGULAR: /^#[A-Za-za-Яа-яЁё 0-9]{1,19}$/,
  IS_HASH_SYMBOL: /[^#]/,
  IS_SPACE: /.#/g,
};

// Сообщания об ошибках
const ErrorMessages = {
  COMMENT_LONG: `Комментарий не может составлять больше ${CommentsFeatures.MAX_LENGTH} символов`,
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа # (решётка)',
  HASHTAGS_LONG: `Максимальная длина одно хэш-тега не должна превышать ${HashtagsFeatures.MAX} символов`,
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${HashtagsFeatures.MAX_NUMBER}`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи'
};

const pristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  succesClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

// Обработчик отправки формы
const setUserFormSubmit = (onSuccess) => {
  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          onSuccessCloseForm();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          onErrorCloseForm();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

// Функция деления строки хэштегов по указаннаму элементу separator
const getStringArray = (string, separator) => string.split(separator);

// Обработчик проверки длины строки ввода комментария
const getCommentTextAreaInput = (value) => (
  getLength(value, CommentsFeatures.MAX_LENGTH)
);
pristine.addValidator(commentTextAreaNode, getCommentTextAreaInput, ErrorMessages.COMMENT_LONG);

// Обработчик проверки длины строки ввода хештега (не более 20 символов)
pristine.addValidator(inputHashtagsNode, () => {
  const hashtags = getStringArray(inputHashtagsNode.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtag.length <= HashtagsFeatures.MAX);
}, ErrorMessages.HASHTAGS_LONG);

// Проверка ввода недопустимых регулярных символов
pristine.addValidator(inputHashtagsNode, () => {
  const hashtags = getStringArray(inputHashtagsNode.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsFeatures.REGULAR.test(hashtag)) || (hashtag.length === 0));
}, ErrorMessages.BAG_SYMBOL_MESSAGE);

// Проверка на обязательное наличие первого символа '#'
pristine.addValidator(inputHashtagsNode, () => {
  const hashtags = getStringArray(inputHashtagsNode.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (hashtag.startsWith('#')) || (hashtag.length === 0));
}, ErrorMessages.HASH_SYMBOL);

// Проверка на наличие ввода только символа '#'
pristine.addValidator(inputHashtagsNode, (value) => {
  if (value.match(HashtagsFeatures.IS_HASH_SYMBOL) || value.length === 0) {
    return true;
  }
  return false;
}, ErrorMessages.TOO_SHORT);

// Проверка наличия повторного хэштега
pristine.addValidator(inputHashtagsNode, () => {
  const hashtagsArr = getStringArray(inputHashtagsNode.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  const copyArrDublicates = Array.from(hashtagsArr);
  let duplicateExists = true;
  for (let i = 0; i <= hashtagsArr.length; i++) {
    if (!(hashtagsArr[i] in copyArrDublicates)) {
      copyArrDublicates[hashtagsArr[i]] = true;
    } else {
      duplicateExists = false;
    }
  }
  return duplicateExists;
}, ErrorMessages.UNIQUE);

// Проверка количества введенных хештегов не более 5
pristine.addValidator(inputHashtagsNode, (value) => {
  if (!(value.split(' ').length > HashtagsFeatures.MAX_NUMBER)) {
    return true;
  }
  return false;
}, ErrorMessages.OVER_MAX);

// Проверка пробелов между хэштегами
pristine.addValidator(inputHashtagsNode, () => {
  const hashtags = getStringArray(inputHashtagsNode.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsFeatures.REGULAR.test(hashtag) || hashtag.length === 0));
}, ErrorMessages.SPACE_HASHTAGS);

export {setUserFormSubmit};
