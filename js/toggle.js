const header = document.querySelector('.header-content')

const sectionIcon = document
    .querySelector('#login')
    .addEventListener('mouseover',(e) => {
        e.preventDefault();

        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('dropdown-container');

        const registrerLink = document.createElement('a');
        const registrerText = document.createTextNode('Crie uma conta');
        registrerLink.classList.toggle('cadastro');
        registrerLink.href = 'cadastro.html'

        const loginLink = document.createElement('a');
        const loginText = document.createTextNode('Já tenho uma conta');
        registrerLink.classList.add('login');
        loginLink.href = 'Login.html'

         registrerLink.appendChild(registrerText);
         loginLink.appendChild(loginText);
         toggleContainer.appendChild(registrerLink)
         toggleContainer.appendChild(loginLink)
         header.appendChild(toggleContainer)
         
    });

    toggleContainer.addEventListener('mouseout', () => {
        header.removeChild(toggleContainer);
    });
