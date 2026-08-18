// ==================================================
// FOODIE - FOOD DELIVERY JAVASCRIPT
// ==================================================


// ==================================================
// CART ARRAY
// ==================================================

let cart = [];


// ==================================================
// CATEGORY FILTER
// ==================================================

function showCategory(category, clickedButton = null) {

    const foodItems =
        document.querySelectorAll(".food-item");

    foodItems.forEach(item => {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {

            item.classList.add("show");

        } else {

            item.classList.remove("show");

        }

    });


    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }

}


// ==================================================
// ADD TO CART
// ==================================================

const addToCartButtons =
    document.querySelectorAll(".add-btn");


addToCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".menu-card");


        const name =
            card
                .querySelector("h3")
                .textContent
                .trim();


        const description =
            card
                .querySelector("p")
                .textContent
                .trim();


        const priceElement =
            card.querySelector(".price");


        const priceText =
            priceElement
                .childNodes[0]
                .textContent
                .trim();


        const price =
            parseInt(
                priceText.replace("₹", ""),
                10
            );


        const image =
            card.querySelector("img").src;


        const existingItem =
            cart.find(
                item =>
                    item.name === name
            );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                description: description,

                price: price,

                image: image,

                quantity: 1

            });

        }


        updateCart();


        const originalText =
            this.textContent;


        this.textContent =
            "Added ✓";


        this.style.background =
            "#28a745";


        setTimeout(() => {

            this.textContent =
                originalText;

            this.style.background =
                "";

        }, 1000);

    });

});


// ==================================================
// UPDATE CART
// ==================================================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Start adding delicious food!
                </p>

            </div>

        `;

        updateCartTotal();
        updateCartCount();

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-image"
            >

            <div class="cart-details">

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-price">
                    ₹${item.price}
                </p>


                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <span class="quantity-number">
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    updateCartTotal();
    updateCartCount();

}


// ==================================================
// INCREASE QUANTITY
// ==================================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ==================================================
// DECREASE QUANTITY
// ==================================================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ==================================================
// REMOVE ITEM
// ==================================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==================================================
// CALCULATE TOTAL
// ==================================================

function calculateTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    return total;

}


// ==================================================
// GET TOTAL ITEMS
// ==================================================

function getTotalItems() {

    let count = 0;


    cart.forEach(item => {

        count +=
            item.quantity;

    });


    return count;

}


// ==================================================
// UPDATE CART COUNT
// ==================================================

function updateCartCount() {

    const count =
        getTotalItems();


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    const cartCountTop =
        document.getElementById(
            "cart-count-top"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }


    if (cartCountTop) {

        cartCountTop.textContent =
            count;

    }

}


// ==================================================
// UPDATE CART TOTAL
// ==================================================

function updateCartTotal() {

    const cartPanel =
        document.getElementById(
            "cart"
        );


    let totalSection =
        document.getElementById(
            "cart-total"
        );


    if (!totalSection) {

        totalSection =
            document.createElement(
                "div"
            );

        totalSection.id =
            "cart-total";

        cartPanel.appendChild(
            totalSection
        );

    }


    if (cart.length === 0) {

        totalSection.innerHTML = "";

        return;

    }


    const subtotal =
        calculateTotal();


    const deliveryFee =
        subtotal >= 500
            ? 0
            : 40;


    const finalTotal =
        subtotal +
        deliveryFee;


    totalSection.innerHTML = `

        <div class="total-box">

            <h3>
                Order Summary
            </h3>


            <div class="total-row">

                <span>
                    Items
                </span>

                <span>
                    ${getTotalItems()}
                </span>

            </div>


            <div class="total-row">

                <span>
                    Subtotal
                </span>

                <span>
                    ₹${subtotal}
                </span>

            </div>


            <div class="total-row">

                <span>
                    Delivery Fee
                </span>

                <span>

                    ${
                        deliveryFee === 0
                            ? "FREE"
                            : "₹40"
                    }

                </span>

            </div>


            <hr>


            <div class="total-row final-total">

                <strong>
                    Total
                </strong>

                <strong>
                    ₹${finalTotal}
                </strong>

            </div>


            <button
                class="checkout-btn"
                onclick="checkout()"
            >
                Proceed to Checkout
            </button>

        </div>

    `;

}


// ==================================================
// ADDRESS
// ==================================================

function getSavedAddress() {

    return (
        localStorage.getItem(
            "foodieAddress"
        ) || ""
    ).trim();

}


// ==================================================
// UPDATE ADDRESS DISPLAY
// ==================================================

function updateAddressDisplay() {

    const address =
        getSavedAddress();


    const savedAddress =
        document.getElementById(
            "saved-address"
        );


    const paymentAddress =
        document.getElementById(
            "payment-address"
        );


    if (savedAddress) {

        savedAddress.textContent =
            address ||
            "No delivery address saved.";

    }


    if (paymentAddress) {

        paymentAddress.textContent =
            address ||
            "No delivery address saved.";

    }

}


// ==================================================
// EDIT ADDRESS
// ==================================================

function editAddress() {

    const addressModal =
        document.getElementById(
            "address-modal"
        );


    const input =
        document.getElementById(
            "address-input"
        );


    input.value =
        getSavedAddress();


    addressModal.classList.add(
        "show-modal"
    );

}


// ==================================================
// SAVE ADDRESS
// ==================================================

function saveAddress() {

    const input =
        document.getElementById(
            "address-input"
        );


    const address =
        input.value.trim();


    if (!address) {

        alert(
            "Please enter a delivery address."
        );

        input.focus();

        return;

    }


    if (address.length < 10) {

        alert(
            "Please enter a complete delivery address."
        );

        input.focus();

        return;

    }


    localStorage.setItem(
        "foodieAddress",
        address
    );


    updateAddressDisplay();


    closeAddressModal();


    alert(
        "Delivery address saved successfully. 📍"
    );

}


// ==================================================
// CLOSE ADDRESS MODAL
// ==================================================

function closeAddressModal() {

    document
        .getElementById(
            "address-modal"
        )
        .classList
        .remove(
            "show-modal"
        );

}


// ==================================================
// CHECKOUT
// ==================================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! 🛒"
        );

        return;

    }


    const address =
        getSavedAddress();


    if (!address) {

        alert(
            "Please add your delivery address before checkout."
        );

        editAddress();

        return;

    }


    const subtotal =
        calculateTotal();


    const deliveryFee =
        subtotal >= 500
            ? 0
            : 40;


    const total =
        subtotal +
        deliveryFee;


    window.currentOrderTotal =
        total;


    updateAddressDisplay();


    document.getElementById(
        "payment-address"
    ).textContent =
        address;


    document
        .getElementById(
            "upi-section"
        )
        .classList
        .remove("show-upi");


    document
        .getElementById(
            "payment-success"
        )
        .classList
        .remove("show-success");


    document.querySelector(
        ".payment-options"
    ).style.display =
        "flex";


    document
        .getElementById(
            "payment-modal"
        )
        .classList
        .add(
            "show-modal"
        );

}


// ==================================================
// UPI PAYMENT
// ==================================================

const FOODIE_UPI_ID =
    "foodie@upi";


function showUPI() {

    const total =
        Number(
            window.currentOrderTotal || 0
        );


    const address =
        getSavedAddress();


    if (!address) {

        alert(
            "Please add your delivery address first."
        );

        editAddress();

        return;

    }


    const amount =
        total.toFixed(2);


    const upiLink =
        `upi://pay?pa=${encodeURIComponent(
            FOODIE_UPI_ID
        )}` +
        `&pn=${encodeURIComponent(
            "Foodie"
        )}` +
        `&am=${encodeURIComponent(
            amount
        )}` +
        `&cu=INR`;


    const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=240x240&data=" +
        encodeURIComponent(
            upiLink
        );


    document.getElementById(
        "upi-qr"
    ).src =
        qrUrl;


    document.getElementById(
        "upi-id-text"
    ).textContent =
        FOODIE_UPI_ID;


    document.getElementById(
        "upi-amount"
    ).textContent =
        `₹${amount}`;


    document
        .getElementById(
            "upi-section"
        )
        .classList
        .add(
            "show-upi"
        );

}


// ==================================================
// COMPLETE PAYMENT
// ==================================================

function completePayment(method) {

    const total =
        Number(
            window.currentOrderTotal || 0
        );


    const address =
        getSavedAddress();


    if (!address) {

        alert(
            "Please add your delivery address first."
        );

        closePaymentModal();

        editAddress();

        return;

    }


    const successBox =
        document.getElementById(
            "payment-success"
        );


    successBox.innerHTML = `

        <div class="success-icon">
            ✅
        </div>

        <h3>
            Order Confirmed!
        </h3>

        <p>
            <strong>
                Payment Method:
            </strong>
            ${method}
        </p>

        <p>
            <strong>
                Amount:
            </strong>
            ₹${total}
        </p>

        <p>
            <strong>
                Delivery Address:
            </strong>

            <br>

            ${escapeHtml(address)}

        </p>

        <p class="success-message">
            Your order has been placed successfully
            and will be delivered to this address. 🎉
        </p>

    `;


    successBox.classList.add(
        "show-success"
    );


    /*
        IMPORTANT:
        Cart is cleared,
        but address is NOT deleted.
    */

    cart = [];


    updateCart();


    localStorage.setItem(
        "foodieAddress",
        address
    );


    document.querySelector(
        ".payment-options"
    ).style.display =
        "none";


    document
        .getElementById(
            "upi-section"
        )
        .classList
        .remove(
            "show-upi"
        );


    setTimeout(() => {

        closePaymentModal();

    }, 4500);

}


// ==================================================
// CLOSE PAYMENT MODAL
// ==================================================

function closePaymentModal() {

    const modal =
        document.getElementById(
            "payment-modal"
        );


    modal.classList.remove(
        "show-modal"
    );


    const success =
        document.getElementById(
            "payment-success"
        );


    if (success) {

        success.classList.remove(
            "show-success"
        );

        success.innerHTML = "";

    }


    const paymentOptions =
        document.querySelector(
            ".payment-options"
        );


    if (paymentOptions) {

        paymentOptions.style.display =
            "flex";

    }


    document
        .getElementById(
            "upi-section"
        )
        .classList
        .remove(
            "show-upi"
        );

}


// ==================================================
// SHOW MESSAGE
// ==================================================

function showMessage(message) {

    alert(message);

}


// ==================================================
// MOBILE CART
// ==================================================

function scrollToCart() {

    const cartPanel =
        document.getElementById(
            "cart"
        );


    if (
        window.innerWidth <= 900
    ) {

        cartPanel.classList.toggle(
            "mobile-open"
        );

    } else {

        cartPanel.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHtml(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==================================================
// CLOSE MODALS ON OUTSIDE CLICK
// ==================================================

window.addEventListener(
    "click",
    function(event) {

        const paymentModal =
            document.getElementById(
                "payment-modal"
            );


        const addressModal =
            document.getElementById(
                "address-modal"
            );


        if (
            event.target ===
            paymentModal
        ) {

            closePaymentModal();

        }


        if (
            event.target ===
            addressModal
        ) {

            closeAddressModal();

        }

    }
);


// ==================================================
// INITIAL PAGE LOAD
// ==================================================

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const allButton =
            document.querySelector(
                ".category-btn"
            );


        if (allButton) {

            showCategory(
                "all",
                allButton
            );

        }


        updateCart();


        updateAddressDisplay();


        const user =
            localStorage.getItem(
                "foodieUser"
            );


        const role =
            localStorage.getItem(
                "foodieRole"
            );


        const welcome =
            document.getElementById(
                "welcome-user"
            );


        if (
            welcome &&
            user
        ) {

            welcome.textContent =
                `Welcome (${role})`;

        }

    }
);


// ==================================================
// LOGOUT
// ==================================================

function logout() {

    localStorage.removeItem(
        "foodieUser"
    );


    localStorage.removeItem(
        "foodieRole"
    );


    /*
        foodieAddress is intentionally
        NOT removed.

        So the saved delivery address
        remains available for the user.
    */


    window.location.href =
        "login.html";

}