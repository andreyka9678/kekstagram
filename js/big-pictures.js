import {getEscapeEvent} from './util.js';

//Описание переменных
const MAX_COMMENT = 5;
const bigPicture =  document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
let commentsArrayData = [];
let commentsCounter = 5;

// Отрисовка одного комментария
const getBigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

//Создание фрагмента комментария
const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const newComment = getBigPictureComment(comment);
    fragment.appendChild(newComment);
  });
  commentsList.appendChild(fragment);
};

//Создание полноразмерного изображения
const showBigPhoto = (bigPhoto) => {
  body.classList.add('modal-open');
  commentsList.innerHTML = '';
  bigPictureImg.querySelector('img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  socialCommentCount.firstChild.textContent = `${MAX_COMMENT} из `;
  commentsArrayData = bigPhoto.comments.slice();
  if (commentsArrayData.length <= MAX_COMMENT) {
    socialCommentCount.firstChild.textContent = `${bigPhoto.comments.length} из `;
    createCommentsFragment(commentsArrayData);
    commentsLoader.classList.add('hidden');
  }
  if (commentsArrayData.length >= MAX_COMMENT) {
    createCommentsFragment(commentsArrayData.slice(0, MAX_COMMENT));
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

//Проверка текущего числа комментариев
const getCurentCommentCount = (comments) => comments ? comments.children.length: 0;

//Обработчик загрузки комментариев
function onCommentsLoaderClick () {
  createCommentsFragment(commentsArrayData.slice(commentsCounter, commentsCounter += MAX_COMMENT));
  if (commentsCounter >= commentsArrayData.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    commentsCounter = MAX_COMMENT;
  }
  socialCommentCount.firstChild.textContent = `${getCurentCommentCount(commentsList)} из `;
  if (commentsArrayData.length === 0) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
}

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick () {
  closeBigPicture();
}

export {showBigPhoto};
