
const checkbox = document.getElementById('menu-checkbox');
  const infoHeader = document.querySelector('.info-header');
  const linksHeader = document.querySelector('.links-header');

  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      infoHeader.style.display = 'flex';
      linksHeader.style.display = 'flex';
    } else {
      infoHeader.style.display = 'none';
      linksHeader.style.display = 'none';
    }
  });


  let currentIndex = 0; // Indice atual da imagem
const slides = document.querySelector('.carrossel');
const dots = document.querySelectorAll('.dot');

// Função para atualizar o índice visual
function updateIndex() {
    // Remove a classe 'active' de todos os dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adiciona a classe 'active' ao dot correspondente
    dots[currentIndex].classList.add('active');
}

// Função para mudar a imagem automaticamente
function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length; // Loop infinito
    slides.style.transform = `translateX(-${currentIndex * 62}vw)`; // Muda a posição
    updateIndex(); // Atualiza o índice
}

// Inicializar o carrossel e a troca automática de imagens
setInterval(nextSlide, 3000); // Troca a cada 3 segundos

// Atualiza o índice ao carregar
updateIndex();

