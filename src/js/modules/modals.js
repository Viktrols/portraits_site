const modals = () => {
    let btnPressed = false;

    function bindModal (triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              allModals = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                btnPressed = true;
                if (destroy) {
                    item.remove();
                }
                allModals.forEach(modal => {
                    modal.style.display = 'none';
                    modal.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.classList.add('modal-open');
                document.body.style.marginRight = `${scroll}px`;
        });
        
       });
        close.addEventListener('click', () => {
            allModals.forEach(modal => {
                modal.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = '0px';
            document.body.style.overflow = '';
       });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                allModals.forEach(modal => {
                    modal.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function(){
            let isAnyModalOpen;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    isAnyModalOpen = true;
                }
            });
            if (!isAnyModalOpen) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);

};

export default modals;