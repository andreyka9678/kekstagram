//Описание переменных для реализации слайдера
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const sliderBlock = document.querySelector('.effect-level');
//Создание объекта дяннах с парамтерами эффектов
const effects = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'none',
    unit: ''
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

// Создание слайдера регулировки эффектов
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});

// Создаем событие клика на радиокнопку и выбор эффекта
let effectFilter;
// sliderBlock.classList.add('hidden');
effectsList.addEventListener('click', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effect = evt.target.value;
    effectFilter = effects[effect];
    sliderElement.noUiSlider.updateOptions(effectFilter);
    if (effect === 'none') {
      image.style.filter = '';
      sliderBlock.classList.add('hidden');
    } else {
      sliderBlock.classList.remove('hidden');
    }
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      image.style.filter = `${effectFilter.filter}(${valueElement.value}${effectFilter.unit})`;
    });
  }
});
