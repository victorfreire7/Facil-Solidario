
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

