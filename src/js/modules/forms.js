// import checkNumInputs from './checkNumInputs';


const forms = () => {
    const allForms = document.querySelectorAll('form'),
          allInputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="photo"]');
    
    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });
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
        design: 'http://127.0.0.1:8000/design/',
        question: 'http://127.0.0.1:8000/contacts/'
    };

    const postData = async (url, data, headers) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data
        });
        return await res.json();
    };

    const clearInputs = () => {
        allInputs.forEach(input => {
            input.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
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
            
            let formData = new FormData(item),
                api,
                headers;
            if (item.closest('.popup-design') || item.classList.contains('calc_form')) {
                api = path.design;
            } else {
                api = path.question;
                formData = JSON.stringify(Object.fromEntries(formData.entries()));
                headers = {'Content-type': 'application/json; charset=utf-8'};
            }
           
            postData(api, formData, headers)
                .then(res => {
                    statusImg.setAttribute('src', messages.ok);
                    textMessage.textContent = messages.success;
                }).catch(() => {
                    statusImg.setAttribute('src', messages.fail);
                    textMessage.textContent = messages.error;
                    }).finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                            item.style.display = 'block';
                            item.classList.remove('fadeOutUp');
                            item.classList.add('fadeInUp');
                        }, 5000);
                    });
            });
    });
};

export default forms;