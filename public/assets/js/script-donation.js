let arrVals = [];

document.addEventListener('click', (e) => {
  let el = e.target;

  if(el.textContent == '+') { // se o botao de adiciona item for acionado
    e.preventDefault()
    
    if(document.querySelector('#options').value == 0 || document.querySelector('.qtd-alimen').value == 0){
      alert('pode não')
      return
    }

    let vals = {
      item: document.querySelector('#options').value,
      quantidade: document.querySelector('.qtd-alimen').value
    }

    arrVals.push(vals); 

    addDiv(arrVals[arrVals.length -1].item, arrVals[arrVals.length -1].quantidade, arrVals.length -1);
    document.querySelector('#allValues').value = JSON.stringify(arrVals); // ao adicionar um item, eu salvo a informaçao dele no ARRAY
  }

  if(el.classList.contains('btn-confirma')){
    if(document.querySelectorAll('.items').length == 0){
      e.preventDefault();
      alert('pode nao');
      return
    }
  }
})

function createScop(item, quantidade, ind) { // ESSA FUNÇAO CRIA TODO HTML DE UM ITEM PARA ENTRAR NO FORMULARIO.
  let d = createEl('div', 'items'); 

  let p = createEl('p', 'id-item');
  p.textContent = ind + 1;
  d.appendChild(p);

  let sp = createEl('span', 'type-input');
  let se = createEl('select', 'input-type');
  se.disabled = true; 

  let op = document.createElement('option');
  op.value = item;
  op.textContent = item;
  se.appendChild(op);

  sp.appendChild(se);
  d.appendChild(sp);

  let spa = createEl('span', 'amount-input');
  spa.textContent = "Quantidade:";

  let inp = createEl('input', 'number-input-form');
  inp.type = 'number';
  inp.readOnly = true;
  inp.value = quantidade;

  spa.appendChild(inp);
  d.appendChild(spa);

  let btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-remove-item';
  btn.textContent = 'x';

  btn.addEventListener('click', () => { // caso o botao de apagar item seja acionado
    d.remove();

    for (const j in arrVals) { // procuro aquele item que foi apagado no array
      if(arrVals[j].item == op.value){ 
        arrVals[j] = ''; //removo aquele item do array
        break;
      }      
    }

    document.querySelector('#allValues').value = JSON.stringify(arrVals); // salvo o item apagado no input oculto do HTML

  });

  d.appendChild(btn);

  return d;
}

function createEl(element, cl) {
  let el = document.createElement(element);
  el.setAttribute('class', cl);
  return el;
}

function addDiv(item, quantidade, ind){
  let all = createScop(item, quantidade, ind);

  document.querySelector('.form-container').appendChild(all)
}