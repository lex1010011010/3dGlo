const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        body = document.querySelector('body'),
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
export default toggleMenu;
