const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cartItemsList");
const removeCartItemButtons = cartItemsList.getElementsByClassName("btn-danger");
let totalCost = 0;

function addItemToCart(itemName, itemPrice) {
    const cartItem = document.createElement("li");
    const itemInfo = document.createElement("span");
    itemInfo.innerText = `${itemName} - ${itemPrice.toFixed(2)} €`;
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-right");
    removeButton.innerText = "Quitar";
    removeButton.addEventListener("click", removeCartItem);
    cartItem.appendChild(itemInfo);
    cartItem.appendChild(removeButton);
    cartItemsList.appendChild(cartItem);

    updateCartTotal();
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartItem = buttonClicked.parentElement;
    const itemPrice = parseFloat(cartItem.innerText.split(" - ")[1]);
    cartItem.remove();
    totalCost -= itemPrice;
    updateCartTotal();
}

function updateCartTotal() {
    let cartTotal = 0;
    const cartItems = cartItemsList.querySelectorAll("li");

    for (let i = 0; i < cartItems.length; i++) {
        const itemPriceText = cartItems[i].querySelector("span").innerText.split(" - ")[1];
        const itemPrice = parseFloat(itemPriceText);
        cartTotal += itemPrice;
    }

    cartTotalPrice.innerText = cartTotal.toFixed(2) + " €";
}

const addToCartButtons = document.getElementsByClassName("btn-primary");
for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", function () {
        const itemName = button.parentElement.querySelector(".card-title").innerText;
        const itemPrice = parseFloat(button.innerText.split(" - ")[1]);
        addItemToCart(itemName, itemPrice);
    });
}

for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
}

document.getElementById("cartTotalPrice").innerText = "0.00€";