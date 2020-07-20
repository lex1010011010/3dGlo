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
export default popup;
