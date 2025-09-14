let arrVals = [];

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  let el = e.target;
  

  if(el.classList.contains = 'btn-add') { // se o botao de adiciona item for acionado
    let count = 0;
    
    let vals = {
      ind: count++,
      item: document.querySelector('#options').value,
      quantidade: document.querySelector('.qtd-alimen').value
    }

    arrVals.push(vals); 

    // for (const element in arrVals) {
    //   addDiv( arrVals[element].item, arrVals[element].quantidade , element)
    // }

    addDiv(arrVals[arrVals.length -1].item, arrVals[arrVals.length -1].quantidade, arrVals.length -1);
  }
})

function createScop(item, quantidade, ind) {
  let d = createEl('div', 'items'); // DIV container

  // Label / ID
  let p = createEl('p', 'id-item');
  p.textContent = ind + 1; // mostra o índice (começa em 1)
  d.appendChild(p);

  // Select
  let sp = createEl('span', 'type-input');
  let se = createEl('select', 'input-type');
  se.disabled = true; // atributo disabled

  let op = document.createElement('option');
  op.value = item;
  op.textContent = item; // texto visível
  se.appendChild(op);

  sp.appendChild(se);
  d.appendChild(sp);

  // Quantidade
  let spa = createEl('span', 'amount-input');
  spa.textContent = "Quantidade:";

  let inp = createEl('input', 'number-input-form');
  inp.type = 'number';
  inp.readOnly = true;
  inp.value = quantidade;

  spa.appendChild(inp);
  d.appendChild(spa);

  // Botão remover
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-remove-item';
  btn.textContent = 'x';

  btn.addEventListener('click', () => {
    // remove o bloco do HTML
    d.remove();

    // remove do array
    for (let i = 0; i < arrVals.length; i++) {
      if (arrVals[i].ind == p.textContent) {
        arrVals.splice(i, 1);
        break;
      }
    }

    // reatribui índices no array
    arrVals.forEach((el, i) => {
      el.ind = i + 1;
    });

    // reatribui índices no HTML
    const todosItens = document.querySelectorAll('.items');
    todosItens.forEach((item, i) => {
      let label = item.querySelector('.id-item');
      if (label) {
        label.textContent = i + 1;
      }
    });

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


// const form = document.querySelector("#form");

//  var id_item_num = 1;



// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const btnAdd = e.target.querySelector(".btn-add");
//   btnAdd.addEventListener("click", getOptions()); 

  

//   function getOptions() {
//     const selector = document.querySelector("#options");
//     const optionValue = selector.value;
//     const optionText = selector.options[selector.selectedIndex].text
//     var input = document.querySelector(".qtd-alimen").value;
    
//     if (optionValue === "0" || input <= 0 ){
//       alert("Escolha um alimento e insira uma quantidade válida");
//       return;
//     }

//     function createItems() {
//       const formContainer = document.querySelector(".form-container");

//       const id_item = document.createElement("p");
//       id_item.classList.add("id-item");
//       id_item.innerText = id_item_num;

//       const items = document.createElement("div");
//       items.className = "items";

//       const typeInput = document.createElement("span");
//       typeInput.classList.add("type-input");

//       const typeText = document.createElement("select");
//       typeText.classList.add("input-type");
//       typeText.disabled = true;

//       // Criar a option com valor selecionado
//       const option = document.createElement("option");
//       option.value = optionValue;
//       option.innerText = optionText;
//       option.selected = true;

//       typeText.appendChild(option);
//       typeInput.appendChild(typeText);

//       const amountSpanInput = document.createElement("span");
//       amountSpanInput.classList.add("amount-input");

//       const amountInput = document.createElement("input");
//       amountInput.classList.add("number-input-form")
//       amountInput.type = "number"; 
//       amountInput.readOnly = true;
//       amountInput.value = input;

//       const btnRemovItem = document.createElement("button");
//       btnRemovItem.type = "button"
//       btnRemovItem.classList.add("btn-remove-item");
//       btnRemovItem.innerHTML = 'x'

     

//       const amountText = document.createTextNode(`Quantidade:`);
//       amountSpanInput.appendChild(amountText);
//       amountSpanInput.appendChild(amountInput);

//       formContainer.appendChild(items);
//       items.append(id_item,typeInput, amountSpanInput, btnRemovItem);

//       id_item_num++;
    

//     }
//     createItems();

   
//   }
// });


//   const btnProx =  document.querySelector(".btn-confirma")
//   btnProx.addEventListener("click", addForm)

//  function addForm(){
//   const formConfir = document.querySelector(".form-confirm");
//   const formConItensBox = document.querySelector(".itens-box");
//   const items = document.querySelectorAll(".items");

//   if (items.length <= 0) {
//     alert("Insira algum alimento antes de proseguir");
//     return;
//   }

//   formConfir.style = "display:flex";

//   items.forEach(item => {
//     // Remove botão X de cada item
//     const btnRemove = item.querySelector(".btn-remove-item");
//     if (btnRemove) {
//       btnRemove.remove();
//     }

//     formConItensBox.appendChild(item);
//     item.classList.replace('items', 'itens-confirm');
//   });

//   // Limpar container original
//   document.querySelector(".form-container").innerHTML = '';
// }


//     const btnCancelForm = document.querySelector(".cancel-form");
//     btnCancelForm.addEventListener("click", limparForm)

//     function limparForm(){


//       const formConfir = document.querySelector(".form-confirm")
//       const formConItensBox = document.querySelector(".itens-box")

//       const items = document.querySelectorAll(".items");
      
//       items.forEach(items => {
//         items.remove()
//       })
//       formConItensBox.innerHTML = '';
//       formConfir.style = "display:none";
//       id_item_num = 1;
//     }

    
//     /// Remover item adicionado ao form antes da confirmação

//     // const btnRemovItem = document.querySelectorAll(".btn-remove-item")
//     // btnRemovItem.addEventListener("click", delItem);

//     document.addEventListener('click', (e) => {
//       let el = e.target;

//       // console.log(el)

//      if (el.classList.contains("btn-remove-item")) {
//     const itemToRemove = el.closest('.items'); // ou .itens-confirm se já estiver confirmado
//     if (itemToRemove) {
//       itemToRemove.remove();
//        // Após remover, atualizar os números dos IDs
//       atualizarIds();
//     }

//   }
//     } )

//     function atualizarIds() {
//   const todosItens = document.querySelectorAll('.items, .itens-confirm');
//   id_item_num = 1; // Resetar contador

//   todosItens.forEach(item => {
//     const idTag = item.querySelector('.id-item');
//     if (idTag) {
//       idTag.innerText = id_item_num;
//       id_item_num++;
//     }
//   });
// }




    // function delItem(){
    //   // btnRemovItem = document.querySelector(".btn-remove-item");
    //   const btn = document.querySelectorAll('.btn-remove-item');
    //   console.log(btn)
    //   // const formu =  document.querySelector(".form-container");
    //   // const item = document.querySelector(".items");

    //   // formu.removeChild(item);
    //   // alert("sim");
    // }
    
// btn-confirma