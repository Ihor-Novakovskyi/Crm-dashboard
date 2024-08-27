document.addEventListener('DOMContentLoaded', () => {
    let paginationIndex = 1;
    const paginationButtonWithNumbers = document.querySelectorAll('.dashboard__pagination-item-number');
    const paginationButtonWithNumbersWithoutLast = [...paginationButtonWithNumbers].slice(0, 4);
    const borderOffsetNext = +paginationButtonWithNumbers[4].childNodes[0].data;
    const borderOffsetPrev = +paginationButtonWithNumbers[0].childNodes[0].data;
    //first render element whit animation on page
    setTimeout(() => {
        const menu = document.querySelector('.main-page__menu-container');
        const contentWithTable = document.querySelector('.main-page__content');
        menu.style.transform = 'translateX(0px)';
        contentWithTable.style.transform = 'translateX(0px)';

    })
    paginationButtonWithNumbersWithoutLast.forEach(button => button.addEventListener('click', changeSlideWhenButtonNumberClicked));
    const table = document.querySelector('table');
    const buttonNext = document.querySelector('.dashboard__pagination-item--next');
    const buttonPrev = document.querySelector('.dashboard__pagination-item--prev');
    buttonNext.addEventListener('click', () => {
        const isPaginationNextDone = doPaginationNext();
        if (isPaginationNextDone) {
            showNextSlide();
        }

    })
    buttonPrev.addEventListener('click', () => {
        const isPaginationPrevDone = doPaginationPrev();
        if (isPaginationPrevDone) {
            showPrevSlide();
        }

    })
    function showNextSlide() {
        table.style.transition = '';
        table.style.transform = 'translateX(-120%)';
        table.addEventListener('transitionend', changePositionWhenTransitionEndNext)
        function changePositionWhenTransitionEndNext() {
            table.removeEventListener('transitionend', changePositionWhenTransitionEndNext);
            table.style.transition = 'none';
            table.style.transform = 'translateX(120%)';
            setTimeout(() => {
                table.style.transform = 'translateX(0px)';
                table.style.transition = '';
            })
        }
    }

    function showPrevSlide() {
        table.style.transition = '';
        table.style.transform = 'translateX(120%)';
        table.addEventListener('transitionend', changePositionWhenTransitionEndPrev)
        function changePositionWhenTransitionEndPrev() {
            table.removeEventListener('transitionend', changePositionWhenTransitionEndPrev);
            table.style.transition = 'none';
            table.style.transform = 'translateX(-120%)';
            setTimeout(() => {
                table.style.transform = 'translateX(0px)';
                table.style.transition = '';
            })
        }
    }

    function doPaginationPrev() {
        paginationIndex--;
        const newPaginationValue = paginationIndex;
        if (newPaginationValue >= borderOffsetPrev) {
            let activeElement = null;
            paginationButtonWithNumbersWithoutLast.forEach((btn) => {
                if (+btn.childNodes[0].data === newPaginationValue) {
                    paginationButtonWithNumbersWithoutLast.forEach((btn) => {
                        //delete active class
                        btn.classList.remove('dashboard__pagination-item--active');
                    });
                    btn.classList.add('dashboard__pagination-item--active');
                    activeElement = btn;
                }
            });

            const lastButtonId = paginationButtonWithNumbersWithoutLast.length - 1;
            //lastButtonId  - index of last button
            if (!activeElement) {
                paginationButtonWithNumbersWithoutLast.forEach((btn, id) => {
                    //delete active class
                    if (id === lastButtonId) {
                        //set last button
                        btn.classList.add('dashboard__pagination-item--active');
                        btn.childNodes[0].data = newPaginationValue;
                    } else {
                        // another buttons will be less than next by lastButtonId - id
                        btn.classList.remove('dashboard__pagination-item--active');
                        btn.childNodes[0].data = newPaginationValue - (lastButtonId - id);
                    }

                });
            }
            return true;//return true if pagination was done
        }
        paginationIndex++;
        return false;//return false if pagination was not done
    }

    function doPaginationNext() {

        paginationIndex++;
        const newPaginationValue = paginationIndex;
        if (borderOffsetNext >= newPaginationValue) {
            console.log('work')
            let activeElement = null;
            paginationButtonWithNumbersWithoutLast.forEach((btn) => {
                if (+btn.childNodes[0].data === newPaginationValue) {
                    paginationButtonWithNumbersWithoutLast.forEach((btn) => {
                        //delete active class
                        btn.classList.remove('dashboard__pagination-item--active');
                    });
                    btn.classList.add('dashboard__pagination-item--active');
                    activeElement = btn;
                }
            });
            if (!activeElement) {
                paginationButtonWithNumbersWithoutLast.forEach((btn, id) => {
                    //delete active class
                    if (id === 0) {
                        //set first button
                        btn.classList.add('dashboard__pagination-item--active');
                        btn.childNodes[0].data = newPaginationValue;
                    } else {
                        btn.classList.remove('dashboard__pagination-item--active');
                        btn.childNodes[0].data = newPaginationValue + id;
                    }

                });
            }
            return true;//return true if pagination was done
        }
        paginationIndex--;
        return false; // return false if pagination was not done
    }

    function changeSlideWhenButtonNumberClicked(e) {
        const button = e.currentTarget;
        const buttonNumber = button.childNodes[0].data;
        if (buttonNumber !== paginationIndex) {
            if (buttonNumber > paginationIndex) {
                showNextSlide();
            } else {
                showPrevSlide();
            }
            paginationIndex = +buttonNumber;//change to number
            paginationButtonWithNumbersWithoutLast.forEach((el) => {
                el === button
                    ?
                    el.classList.add('dashboard__pagination-item--active')
                    :
                    el.classList.remove('dashboard__pagination-item--active')
            })
        }
    }

})




