import {getEscapeEvent} from './util.js';
import {getScaleImageTransform} from './scale.js';

// Описание переменных
const body = document.body;
const uploadFileInputNode = document.querySelector('#upload-file');
const uploadFormNode = document.querySelector('.img-upload__form');
const editImageOverlayNode = document.querySelector('.img-upload__overlay');
const editImageCloseButtonNode = editImageOverlayNode.querySelector('.img-upload__cancel');
const inputHashtagsNode = document.querySelector('.text__hashtags');
const commentTextAreaNode = document.querySelector('.text__description');
const imageScaleValueNode = document.querySelector('.scale__control--value');
const DEFAULT_SCALE_VALUE = 100;
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const sliderBlock = document.querySelector('.effect-level');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция открытия окна редактирования
const openImageEditOverlay = () => {
  body.classList.add('modal-open');
  editImageOverlayNode.classList.remove('hidden');
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButtonNode.addEventListener('click', onImageOverlayClose);
  imageScaleValueNode.value = `${DEFAULT_SCALE_VALUE}%`;
  getScaleImageTransform();
  image.style.filter = '';
  sliderBlock.classList.add('hidden');
  const pristineErrorNode = document.querySelector('.pristine-error');
  if (pristineErrorNode) {
    pristineErrorNode.textContent = '';
  }
};

// Обработчик открытия окна редактирования
function onUploadChange () {
  openImageEditOverlay();
}

uploadFileInputNode.addEventListener('change', onUploadChange);
// Функция закрытия окна редактора
const editImageOverlayClose = () => {
  editImageOverlayNode.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFormNode.reset();
  document.removeEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButtonNode.removeEventListener('click', onImageOverlayClose);
};

// Обработчик закрытия окна редактирования
function onImageOverlayClose () {
  editImageOverlayClose();
}

// Функция закрытия окна редактора по ESC
function onImageOverlayEscPress (evt) {
  const active = document.activeElement;
  if (inputHashtagsNode !== active && commentTextAreaNode !== active) {
    getEscapeEvent(evt, editImageOverlayClose);
  }
}

// Создаем фрагмент сообщения об успешной отправке
const createStatusMessage = (template) => {
  const statusMessage = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(statusMessage);
  body.appendChild(fragment);
};

// Создание сообщения об успешной отправке формы
const createSuccessMessage = () => {
  createStatusMessage(successTemplate);
};

// Закрытие сообщения об успешной отправке
const closeSuccessMessage = () => {
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  body.removeChild(successOverlay);
};

// Обработчик закрытия сообщения об успешной отправке
function onSuccessMessageCloseClick () {
  closeSuccessMessage();
}

// Разблокировка кнопки после отправки
const unblockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = false;
  uploadFormButton.textContent = 'опубликовать';
};

// Обработчик закрытия успешной отправки формы
const onSuccessCloseForm = () => {
  createSuccessMessage();
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessMessageEscPress);
  successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
  const successField = document.querySelector('.success__inner');
  successOverlay.addEventListener('click', (evt) => {
    if (evt.target !== successField) {
      closeSuccessMessage();
    }
  });
};

// Блокировка кнопки во время отправки
const blockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = true;
  uploadFormButton.textContent = 'Сохраняю...';
};

// Обработчик закрытия сообщения об успехе по Escape
function onSuccessMessageEscPress (evt) {
  getEscapeEvent(evt, closeSuccessMessage);
}

// Создание сообщения об ошибке при отправке формы
const createErrorMessage = () => {
  editImageOverlayClose();
  createStatusMessage(errorTemplate);
};

// Закрытие сообщения об ошибки при отправке
const closeErrorMessage = () => {
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorOverlay.querySelector('.error__button');
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  document.removeEventListener('keydown', onErrorMessageEscPress);
  body.removeChild(errorOverlay);
};

// Обработчик закрытия сообщения об ошибке
function onErrorMessageCloseClick () {
  closeErrorMessage();
}

// Обработчик закрытия сообщения об ошибке по Escape
function onErrorMessageEscPress (evt) {
  getEscapeEvent(evt, closeErrorMessage);
}

// Обработчик закрытия сообщения об ошибке при отправке
const onErrorCloseForm = () => {
  createErrorMessage();
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorTemplate.querySelector('.error__button');
  document.addEventListener('keydown', onErrorMessageEscPress);
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  const errorField = document.querySelector('.error__inner');
  errorOverlay.addEventListener('click', (evt) => {
    if (evt.target !== errorField) {
      closeErrorMessage();
    }
  });
};

export {onImageOverlayClose, editImageOverlayClose, unblockSubmitButton, onErrorCloseForm, blockSubmitButton, onSuccessCloseForm};
