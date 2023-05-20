const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);
    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', ()=> {
        console.log(burgerElem);
        console.log(menuElem);
        console.log( window.screen.availWidth);
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
            console.log(menuElem);
        } else {
            menuElem.style.display = 'none';
        }
    });
    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });
};

export default burger;