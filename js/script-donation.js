const form = document.querySelector("#form");

 var id_item_num = 1;


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const btnAdd = e.target.querySelector(".btn-add");
  btnAdd.addEventListener("click", getOptions());

   

  function getOptions() {
    const selector = document.querySelector("#options");
    const option = selector.value;
    const input = document.querySelector(".qtd-alimen").value;
    
    if (option === "0" || input <= 0 ){
      alert("Escolha um alimento e insira uma quantidade válida");
      return;
    }

    function createItems() {
      const formContainer = document.querySelector(".form-container");

      const id_item = document.createElement("p");
      id_item.classList.add("id-item");
      id_item.innerText = id_item_num;

      const items = document.createElement("div");
      items.className = "items";

      const typeInput = document.createElement("span");
      typeInput.classList.add("type-input");

      const typeText = document.createTextNode(option);
      typeInput.appendChild(typeText);

      const amountInput = document.createElement("span");
      amountInput.classList.add("amount-input");

      

     

      const amountText = document.createTextNode(`Quantidade:   ${input}`);
      amountInput.appendChild(amountText);

      formContainer.appendChild(items);
      items.append(id_item,typeInput, amountInput);

      id_item_num++;

    }
    createItems();
  }
});


// btn-confirma