import {mixPhotosArray} from './util.js';
import {debounce} from './util.js';
import {getData} from './api.js';
import {createPhotosFragment} from './pictures.js';

// Описание переменных
const filterBlock = document.querySelector('.img-filters');
const filterBlockForm = filterBlock.querySelector('.img-filters__form');
const discussedFilter = filterBlock.querySelector('#filter-discussed');
const randomFilter = filterBlock.querySelector('#filter-random');
const defaultFilter = filterBlock.querySelector('#filter-default');
const RANDOM_PHOTOS = 10;
const TIMEOUT_DELAY = 500;
let photosArray;

//Переключение класса активной кнопки
const setActiveClass = (element) => {
  const activeButton = filterBlock.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  element.classList.add('img-filters__button--active');
};

// Удаление фотографий
const removePhotos =() => {
  const photosArr = document.querySelectorAll('.pictures .picture');
  photosArr.forEach((photo) => {
    photo.remove();
  });
};

// Отображение дефолтных фотографий
const getDefaultPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const defaultPhotos = photosCopyArray;
  createPhotosFragment(defaultPhotos);
};

// Cоздание сортировки массива по количеству коментариев
const sortPhotosByComments = (photoArray) => {
  photoArray.sort((first, second) => second.comments.length - first.comments.length);
  return photoArray;
};

// Создание массива обсуждаемых фотографий
const getPhotosDiscussed = () => {
  const photosCopyArray = Array.from(photosArray);
  const discussedPhotos = sortPhotosByComments(photosCopyArray);
  createPhotosFragment(discussedPhotos);
};

// Создание массива 10 случайных фотографий
const getRandomPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const randomPhotos = mixPhotosArray(photosCopyArray).slice(0, RANDOM_PHOTOS);
  createPhotosFragment(randomPhotos);
};

// Обработчик изменения фильтров
const onFilterClick = debounce((evt) => {
  const target = evt.target;
  removePhotos();
  setActiveClass(target);
  switch (target) {
    case randomFilter:
      getRandomPhotos();
      break;
    case defaultFilter:
      getDefaultPhotos();
      break;
    case discussedFilter:
      getPhotosDiscussed();
      break;
    default:
      getDefaultPhotos();
  }
}, TIMEOUT_DELAY);

filterBlockForm.addEventListener('click', onFilterClick);

const receiveData = (photos) => {
  photosArray = photos;
  createPhotosFragment(photos);
  filterBlock.classList.remove('img-filters--inactive');
};

getData(receiveData);
