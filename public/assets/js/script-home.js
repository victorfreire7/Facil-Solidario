const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showNextSlide() {
  carouselItems[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 3000);