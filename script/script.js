window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRamaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRamainig = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRamainig % 60),
                minutes = Math.floor(timeRamainig / 60) % 60,
                hours = Math.floor(timeRamainig / 60 / 60);
            return { hours, minutes, seconds, timeRamainig };
        }

        function addZero(number) {
            if (number.toString().length < 2) {
                return '0' + number;
            } else {
                return number;
            }
        }

        function updateClock() {
            const timer = getTimeRamaining();
            if (timer.timeRamainig > 0) {
                setInterval(() => {
                    const timer = getTimeRamaining();
                    timerHours.textContent = addZero(timer.hours);
                    timerMinutes.textContent = addZero(timer.minutes);
                    timerSeconds.textContent = addZero(timer.seconds);
                }, 1000);
            }
        }

        const check = getTimeRamaining();
        if (check.timeRamainig > 0) {
            updateClock();
        } else {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }
    countTimer('12 july 2020');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));


    };
    toggleMenu();

    //Popup
    const popup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
        let count = 0;
        const popupAnimateUp = () => {
            const ren = requestAnimationFrame(popupAnimateUp);
            if (popup.style.opacity < 1) {
                popup.style.opacity = count;
                count += 0.05;
                popup.style.pointerEvents = 'all';
            } else {
                cancelAnimationFrame(ren);
            }
        };
        const popupAnimateDown = () => {
            const ren = requestAnimationFrame(popupAnimateDown);
            if (popup.style.opacity > 0) {
                popup.style.opacity = count;
                count -= 0.05;
                popup.style.pointerEvents = 'none';
            } else {
                cancelAnimationFrame(ren);
            }
        };
        popupBtn.forEach(item => {
            item.addEventListener('click', () => {
                if (screen.width > 786) {
                    popupAnimateUp();
                } else {
                    popup.style.opacity = 1;
                    popup.style.pointerEvents = 'all';
                }
            });
        });
        popupClose.addEventListener('click', () => {
            popupAnimateDown();
        });
    };
    popup();


    //Scroll

    const scroll = () => {

    };

});


