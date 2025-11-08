document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.pop-up').remove();
    window.location.href = '/';
})