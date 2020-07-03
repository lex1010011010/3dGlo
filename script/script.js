window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerDays = document.querySelector('#timer-days');

        function getTimeRamaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRamainig = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRamainig % 60),
                minutes = Math.floor(timeRamainig / 60) % 60,
                hours = Math.floor(timeRamainig / 60 / 60) % 24,
                days = Math.floor(timeRamainig / 60 / 60 / 24);
            return { days, hours, minutes, seconds, timeRamainig };
        }

        function addZero(number) {
            if (number.toString().length !== 2) {
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
                    timerDays.textContent = addZero(timer.days);
                    timerHours.textContent = addZero(timer.hours);
                    timerMinutes.textContent = addZero(timer.minutes);
                    timerSeconds.textContent = addZero(timer.seconds);
                    console.log('1');
                }, 1000);
            }
        }

        const check = getTimeRamaining();
        if (check.timeRamainig > 0) {
            updateClock();
        } else {
            timerDays.textContent = '00';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }
    countTimer('12 july 2020');
});
