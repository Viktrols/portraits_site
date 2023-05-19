const showMore = (trigger, cards) => {
    const allCards = document.querySelectorAll(cards),
          btn = document.querySelector(trigger);
    console.log(allCards);
    allCards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        allCards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        // btn.style.display = 'none';
        btn.remove();
    });
         
};

export default showMore;