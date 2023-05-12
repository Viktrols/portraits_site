// import checkNumInputs from './checkNumInputs';


const forms = () => {
    const allForms = document.querySelectorAll('form'),
          allInputs = document.querySelectorAll('input');
    
    // checkNumInputs('input[name="phone"]');

    const messages = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        error: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        design: '',
        question: ''
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
                },
            body: data
        });
        return await res.json();
    };

    const clearInputs = () => {
        allInputs.forEach(input => {
            input.value = '';
        });
    };

    allForms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', messages.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = messages.loading;
            statusMessage.appendChild(textMessage);
            
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            const formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://127.0.0.1:8000/contacts/', formDataJSON)
                .then(res => {
                    statusMessage.textContent = messages.success;
                }).catch(() => {
                    console.log(res);
                    statusMessage.textContent = messages.error;
                    }).finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
    });
};

export default forms;