const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const btnAdd = e.target.querySelector(".btn-add");
  btnAdd.addEventListener("click", getOptions());

  function getOptions() {
    const selector = document.querySelector("#options");
    const option = selector.value;

    function createItems() {
      const formContainer = document.querySelector(".form-container");

      const items = document.createElement("div");
      items.className = "items";

      const typeInput = document.createElement("span");
      typeInput.classList.add("type-input");

      const typeText = document.createTextNode(option);
      typeInput.appendChild(typeText);

      const amountInput = document.createElement("span");
      amountInput.classList.add("amount-input");

      const amountText = document.createTextNode("Quantidade:");
      amountInput.appendChild(amountText);

      const input = document.createElement("input");

      formContainer.appendChild(items);
      items.append(typeInput, amountInput, input);
    }
    createItems();
  }
});
