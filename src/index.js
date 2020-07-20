'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import popup from './modules/popup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changer from './modules/changer';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('26 july 2020');
//Menu
toggleMenu();
//Popup
popup();
//Tasbs
tabs();
//Slider
slider();
//Change photos
changer();
//Calc
calc(100);
//Send-ajax-form
sendForm();
