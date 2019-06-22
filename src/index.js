import './css/index.css';

import $ from 'jquery';
import FullPage from 'fullpage.js';

new FullPage('#h5', {
  onLeave (origin, { index }, direction) {
    $('.page').find('.component').eq(index).fadeOut();
  },
  afterLoad (origin, { index }, direction) {
    $('.page').find('.component').eq(index).fadeIn();
  }
})