import {showBigPictureObject} from './big-pictures.js';

// Описание переменных
const templateFragmentNode = document.querySelector('#picture').content.querySelector('.picture');
const fragmentNode = document.createDocumentFragment();
const photosBlockNode = document.querySelector('.pictures');

// Заполнение шаблона документа
const getPhotoItem = (photoObject) => {
  const photoItemNode = templateFragmentNode.cloneNode(true);
  photoItemNode.querySelector('.picture__img').src = photoObject.url;
  photoItemNode.querySelector('.picture__likes').textContent = photoObject.likes;
  photoItemNode.querySelector('.picture__comments').textContent = photoObject.comments.length;
  photoItemNode.addEventListener('click', () => {
    showBigPictureObject(photoObject);
  });
  return photoItemNode;
};

// Создание вставки шаблона в фрагмент документа

const createPhotosFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = getPhotoItem(photos[i]);
    fragmentNode.appendChild(photoElement);
  }
  photosBlockNode.appendChild(fragmentNode);
};

export {createPhotosFragment};
