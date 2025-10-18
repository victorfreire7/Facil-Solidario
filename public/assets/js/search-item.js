let valueInput = document.querySelector('#searchItens');

document.querySelector('.searchItens-btn')
.addEventListener('click', () => {
    window.location.href = `/admin/${valueInput.value}`
})