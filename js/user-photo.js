// Описание переменных
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = editImageOverlay.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const fileChooser = document.querySelector('.img-upload__input');

// Выбор фотографии пользователя
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    image.src = URL.createObjectURL(file);
  }
});
