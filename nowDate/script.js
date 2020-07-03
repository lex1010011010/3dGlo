const nowDate = new Date();
const first = document.querySelector('.first');

function upFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const weekday = upFirst(nowDate.toLocaleString('ru', { weekday: 'long' })),
    time = nowDate.toLocaleString('en', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

const weekdayItem = document.createElement('div'),
    timeItem = document.createElement('div'),
    timesOfDayItem = document.createElement('div'),
    newYearItem = document.createElement('div');

function newYearCount() {
    const newYear = new Date(`1 january ${nowDate.getFullYear() + 1}`);
    const timeRemaining = (newYear.getTime() - nowDate.getTime()) / 1000;
    return (Math.floor(timeRemaining / 60 / 60 / 24));
}

function getTimesOfDay() {
    const hours = nowDate.getHours();
    if (hours >= 5 && hours < 12) {
        return 'Доброе утро!';
    } else if (hours >= 12 && hours < 17) {
        return 'Добрый день!';
    } else if (hours >= 17 && hours < 23) {
        return 'Добрый вечер!';
    } else if (hours >= 0 && hours < 5) {
        return 'Доброй ночи!';
    }
}

weekdayItem.textContent = `Сегодня: ${weekday}`;
timeItem.textContent = `Текущее время: ${time}`;
newYearItem.textContent = `До нового года осталось ${newYearCount()} дней`;
timesOfDayItem.textContent = getTimesOfDay();

first.before(timesOfDayItem);
first.before(weekdayItem);
first.before(timeItem);
first.before(newYearItem);
