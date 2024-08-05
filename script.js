// Toggle Menu
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

// Scroll Reveal Animation
ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-text, .about-text', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.home-img, .about-img', { delay: 400, origin: 'top' });
ScrollReveal().reveal('.menu-container, .services-container, .contact-box', { delay: 600, origin: 'top' });
ScrollReveal().reveal('.heading, .connect-text', { delay: 800, origin: 'top' });

// Dark Mode Toggle
let darkModeIcon = document.querySelector('#darkmode');
darkModeIcon.onclick = () => {
    document.body.classList.toggle('darkmode');
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        let itemName = this.getAttribute('data-name');
        let itemPrice = this.getAttribute('data-price');
        let item = { name: itemName, price: parseInt(itemPrice), quantity: 1 };
        let existingItem = cart.find(cartItem => cartItem.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }
        saveCartToLocalStorage();
        updateCartDisplay();
    });
});

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    let cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: Rs${item.price * item.quantity}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('total-price').textContent = totalPrice;

    // Add order confirm button if there are items in the cart
    if (cart.length > 0) {
        let orderConfirmBtn = document.createElement('a');
        orderConfirmBtn.id = 'order-confirm';
        orderConfirmBtn.href = '#';
        orderConfirmBtn.textContent = 'Order Confirm';
        cartContainer.appendChild(orderConfirmBtn);
    }

    // Add remove button functionality
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            cart.splice(index, 1);
            saveCartToLocalStorage();
            updateCartDisplay();
        });
    });
}
// Search Functionality
document.getElementById('search').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    document.querySelectorAll('.box').forEach(box => {
        let itemName = box.querySelector('h2').textContent.toLowerCase();
        if (itemName.includes(query)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
});
