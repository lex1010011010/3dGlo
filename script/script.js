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
            body = document.querySelector('body'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li>a'),
            main = document.querySelector('main'),
            scrollBtn = document.querySelector('main>a');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        //Scroll
        const smoothScroll = blockID => {
            event.preventDefault();
            document.querySelector(blockID).scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        body.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('menu>ul>li>a')) {
                const blockID = target.getAttribute('href');
                handlerMenu();
                smoothScroll(blockID);
            } else if (target.matches('.close-btn')) {
                handlerMenu();
            } else if (target.matches('main>a>img')) {
                const blockID = scrollBtn.getAttribute('href');
                smoothScroll(blockID);
            } else {
                target = target.closest('.menu');
                if (target) {
                    handlerMenu();
                    target = event.target;
                } else {
                    target = event.target;
                    if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu')) {
                        handlerMenu();
                    }
                }
            }
        });
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

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popupAnimateDown();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popupAnimateDown();
                }
            }
        });

    };
    popup();

    //Tasbs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const togleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        togleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
});

