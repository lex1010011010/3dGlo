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
    countTimer('28 july 2020');

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
            popupBtn = document.querySelectorAll('.popup-btn');

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

    //Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');



        let currentSlide = 0,
            interval,
            dot;

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const tmp = document.createElement('li');
                tmp.classList.add('dot');
                portfolioDots.append(tmp);
                if (i === 0) {
                    tmp.classList.add('dot-active');
                }
            }
            return dot = document.querySelectorAll('.dot');
        };

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (delay = 3000) => {
            interval = setInterval(autoPlaySlide, delay);
        };

        const stoptSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stoptSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3000);
        addDots();
    };
    slider();

    //Change photos
    const changer = () => {
        const command = document.querySelector('#command');
        let tmp;
        command.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.classList.contains('command__photo')) {
                tmp = target.src;
                target.src = target.dataset.img;
            }
        });
        command.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.classList.contains('command__photo')) {
                target.src = tmp;
            }
        });
    };
    changer();

    //Validation
    const validation = () => {
        const calcItem = document.querySelectorAll('.calc-item');

        calcItem.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });

    };
    validation();


    //Calc
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };


        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });


    };
    calc(100);
});
