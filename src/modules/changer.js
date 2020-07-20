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
export default changer;
