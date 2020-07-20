const sendForm = () => {
    const errorMessage = 'Что-то пошло не так....',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!!',
        errorInput = 'Ошибка ввода';

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        forms = document.querySelectorAll('form');

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const clearInput = form => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(elem => {
            elem.value = '';
        });
    };

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const validPhone = form => {
        const inputPhone = form.querySelector('.form-phone');
        const test = /^(8|\+7)?[\d]{10}$/.test(inputPhone.value);
        if (!test) {
            inputPhone.style.border = 'solid 1px red';
        } else {
            inputPhone.style.border = '';
        }
        return test;
    };

    const validText = form => {
        const inputText = form.querySelectorAll('input[type=text]');
        let result = true;
        inputText.forEach(item => {
            const test = /[а-яА-ЯёЁ\s]/.test(item.value);
            if (!test) {
                result = false;
                item.style.border = 'solid 1px red';
            } else {
                item.style.border = '';
            }
        });
        return result;
    };

    const denyText = form => {
        const inputText = form.querySelectorAll('input[type=text]');
        inputText.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-яА-ЯёЁ\s]/, '');
            });
        });
    };

    form1.addEventListener('submit', event => {
        event.preventDefault();
        form1.append(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form1);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        if (validPhone(form1) && validText(form1)) {
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    clearInput(form1);
                })
                .catch(error => {
                    console.error(error);
                    statusMessage.textContent = errorMessage;
                });

        } else {
            statusMessage.textContent = errorInput;
        }
    });

    form2.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form2);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        if (validPhone(form2) && validText(form2)) {
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    clearInput(form2);
                })
                .catch(error => {
                    console.error(error);
                    statusMessage.textContent = errorMessage;
                });

        }
    });

    form3.addEventListener('submit', event => {
        event.preventDefault();
        form3.append(statusMessage);
        statusMessage.style.fontSize = '1.5rem';
        statusMessage.style.color = 'white';


        const formData = new FormData(form3);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        if (validPhone(form3) && validText(form3)) {
            postData(body)
                .then(response => {

                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    clearInput(form3);
                })
                .catch(error => {
                    console.error(error);
                    statusMessage.textContent = errorMessage;
                });

        }
    });

    forms.forEach(elem => {
        denyText(elem);
    });
    // maskPhone('.form-phone');

};
export default sendForm;
