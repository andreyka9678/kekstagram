import {showBigPhoto} from './big-pictures.js';

// Описание переменных
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const photosBlock = document.querySelector('.pictures');

// Заполнение шаблона документа
const getPhotoItem = (photoObject) => {
  const photoItem = templateFragment.cloneNode(true);
  photoItem.querySelector('.picture__img').src = photoObject.url;
  photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
  photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
  photoItem.addEventListener('click', () => {
    showBigPhoto(photoObject);
  });
  return photoItem;
};

//Создание вставки шаблона в фрагмент документа
const createPhotosFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = getPhotoItem(photos[i]);
    fragment.appendChild(photoElement);
  }
  photosBlock.appendChild(fragment);
};

export {createPhotosFragment};
