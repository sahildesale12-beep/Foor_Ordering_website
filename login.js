let selectedRole = "user";


// ==================================================
// SELECT ROLE
// ==================================================

function selectRole(role, button) {

    selectedRole = role;


    document
        .querySelectorAll(".role-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );

}


// ==================================================
// SHOW / HIDE PASSWORD
// ==================================================

function togglePassword() {

    const password =
        document.getElementById(
            "password"
        );


    const icon =
        document.querySelector(
            ".toggle-password i"
        );


    if (
        password.type ===
        "password"
    ) {

        password.type =
            "text";


        icon.classList.remove(
            "fa-eye"
        );


        icon.classList.add(
            "fa-eye-slash"
        );

    } else {

        password.type =
            "password";


        icon.classList.remove(
            "fa-eye-slash"
        );


        icon.classList.add(
            "fa-eye"
        );

    }

}


// ==================================================
// FORGOT PASSWORD
// ==================================================

function forgotPassword() {

    alert(
        "Demo: Password reset feature coming soon!"
    );

}


// ==================================================
// LOGIN
// ==================================================

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const email =
                document.getElementById(
                    "email"
                )
                .value
                .trim();


            const password =
                document.getElementById(
                    "password"
                )
                .value
                .trim();


            const address =
                document.getElementById(
                    "address"
                )
                .value
                .trim();


            const message =
                document.getElementById(
                    "loginMessage"
                );


            // Demo credentials

            const users = {

                user: {

                    email:
                        "user@foodie.com",

                    password:
                        "123456"

                },

                partner: {

                    email:
                        "partner@foodie.com",

                    password:
                        "123456"

                }

            };


            // Address validation

            if (!address) {

                message.textContent =
                    "Please enter your delivery address.";

                message.className =
                    "message error";

                document
                    .getElementById(
                        "address"
                    )
                    .focus();

                return;

            }


            if (address.length < 10) {

                message.textContent =
                    "Please enter a complete delivery address.";

                message.className =
                    "message error";

                document
                    .getElementById(
                        "address"
                    )
                    .focus();

                return;

            }


            // Login validation

            if (
                email ===
                    users[selectedRole].email
                &&
                password ===
                    users[selectedRole].password
            ) {


                localStorage.setItem(
                    "foodieRole",
                    selectedRole
                );


                localStorage.setItem(
                    "foodieUser",
                    email
                );


                /*
                    SAVE DELIVERY ADDRESS

                    This is the important part.
                    The same address is used on:
                    - Main page
                    - Cart
                    - Checkout
                    - Payment success
                    - Next login
                */

                localStorage.setItem(
                    "foodieAddress",
                    address
                );


                message.textContent =
                    "Login successful! Redirecting...";


                message.className =
                    "message success";


                setTimeout(
                    () => {

                        window.location.href =
                            "index.html";

                    },
                    800
                );


            } else {


                message.textContent =
                    "Invalid email or password!";


                message.className =
                    "message error";

            }

        }
    );