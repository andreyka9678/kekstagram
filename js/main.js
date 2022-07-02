import {editImageOverlayClose} from './form.js';
import {setUserFormSubmit} from './validation.js';
import {createPhotosFragment} from './pictures.js';
import {getData} from './api.js';
import './form.js';
import './scale.js';
import './slider.js';

getData((photos) => {
  createPhotosFragment(photos);
});

setUserFormSubmit(editImageOverlayClose);
