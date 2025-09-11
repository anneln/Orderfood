import menuArray from "./data.js";

let orderItems = [];

let menuInHtml = [];
function displayMenu() {
  return menuArray
    .map(function (food) {
      console.log(menuArray);

      return `<div class="food-card">
                <div class="food-article">
                  <div class="food-img">
                    <img src="${food.image}"/>
                  </div>
                  <div class="food-text">
                    <h3 class="food-title">${food.name}</h3>
                    <p class="food-description">${food.ingredients}</p>
                    <p class="food-price">${food.price}€</p>
                  </div>
                </div>
                <div class='div-plus'>
                  <i class="fa-solid fa-plus add-btn" data-addfood="${food.name}"></i>
                </div>
              </div>
               `;
    })
    .join(" ");
}

menuInHtml = displayMenu();
document.getElementById("container").innerHTML = menuInHtml;
console.log(menuInHtml);

function renderOrder() {
  const ordercontainer = document.getElementById("order");
  if (orderItems.length === 0) {
    ordercontainer.innerHTML = "";
    return;
  }
  let total = orderItems.reduce((total, item) => total + item.price, 0);
  const orderInHtml = `<div class="order-card">
                <h4>Your order :</h4>
              <div class="list-items">
                <ul>
                ${orderItems
                  .map(function (item, index) {
                    return `<li>
                    <div class="itemName">
                      <h3>${item.name}</h3>
                      <span class="remove" data-index="${index}"> Remove</span>
                    </div>
                    <div class="itemPrice">
                      <p >${item.price} €</p>
                    </div> 
                  </li>`;
                  })
                  .join("")}
                </ul>
              </div>
              <div class="total-price">
                <p class="price-text">Total price: </p>
                <p class="price-amount">${total} €</p>
              </div>
              <button class="btn" id="purchase-btn">Complete Order</button>
            </div>`;

  document.getElementById("order").innerHTML = orderInHtml;

  const removeBtns = document.getElementsByClassName("remove");
  for (let btn of removeBtns) {
    btn.addEventListener("click", function (e) {
      const index = Math.floor(Number(e.target.dataset.index));
      if (index >= 0) {
        orderItems.splice(index, 1);
        renderOrder();
      }
    });
  }

  const purchaseBtn = document.getElementById("purchase-btn");
  const modalForm = document.querySelector(".modal-form");
  const modalOverlay = document.querySelector(".modal-overlay");

  purchaseBtn.addEventListener("click", function () {
    modalForm.style.display = "block";
    modalOverlay.style.display = "block";
  });

  const nameInput = document.getElementById("name");
  const cbInput = document.getElementById("cbNumber");
  const cvvInput = document.getElementById("cvv");
  const message = document.querySelector(".thanks");
  const order = document.getElementById("order");

  modalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (nameInput.value && cbInput.value && cvvInput.value) {
      modalForm.style.display = "none";
      modalOverlay.style.display = "none";
      order.style.display = "none";
      orderItems = [];
      renderOrder();
      message.style.display = "block";
    }
  });
}

const addbtns = document.getElementsByClassName("fa-plus");
for (let btn of addbtns) {
  btn.addEventListener("click", function (e) {
    const foodName = e.target.dataset.addfood;
    const selectedFood = menuArray.find((item) => item.name === foodName);

    if (selectedFood) {
      orderItems.push(selectedFood);
      renderOrder();
    }
  });
}
