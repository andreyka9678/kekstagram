//Описываем переменные
const minScaleButton = document.querySelector('.scale__control--smaller');
const maxScaleButton = document.querySelector('.scale__control--bigger');
const imageScaleValue = document.querySelector('.scale__control--value');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = editImageOverlay.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

//Установка значения масштаба по умолчанию на 100%
imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`;

//Преобразование значения масштаба в целое число c указанной системой счисления
const getTransformValue = () => parseInt(imageScaleValue.value, 10);

//Преобразование масштаба в разметке
const getScaleImageTransform = () => {
  image.style.transform = `scale(${(getTransformValue()/100)})`;
};

//Уменьшение масштаба изоабражения
const getlowerValueScale = () => {
  let resultValue = getTransformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  } else {
    imageScaleValue.value = `${resultValue}%`;
  }
};

//Увеличение масштаба изоабражения
const gethigherValueScale = () => {
  let resultValue = getTransformValue() + SCALE_STEP;
  if(resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  imageScaleValue.value = `${resultValue}%`;
};

//Обработчик нажатия на клавишу 'уменьшение масштаба'
function onMinButtonClick () {
  getlowerValueScale();
  getScaleImageTransform();
}

//Обработчик нажатия на клавишу 'увеличение масштаба'
function onMaxButtonClick() {
  gethigherValueScale();
  getScaleImageTransform();
}

//Создаем события на кнопки изменения масштаба
minScaleButton.addEventListener('click', onMinButtonClick);
maxScaleButton.addEventListener('click', onMaxButtonClick);

export {getScaleImageTransform};
