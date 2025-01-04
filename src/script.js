import { createStore } from 'redux';
import cartReducer from './cartReducer';
import { addToCart, removeFromCart, calculateTotal } from './actions';

const store = createStore(cartReducer);

store.subscribe(() => {
    updateCart();
});

const products = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 15 }
];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");

function renderProducts() {
    productList.innerHTML = products.map(product => `
        <li>
            ${product.name} - Rs.${product.price}
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </li>
    `).join('');
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => handleAddToCart(Number(button.dataset.id)));
    });
}

function updateCart() {
    const cartState = store.getState();
    cartList.innerHTML = cartState.cartItems.map(item => `
        <li>
            ${item.name} - Rs.${item.price} - Quantity: ${item.quantity}
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
        </li>
    `).join('');
    cartTotal.textContent = `Total: Rs.${cartState.total}`;
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', () => handleRemoveFromCart(Number(button.dataset.id)));
    });
}

function handleAddToCart(productId) {
    const product = products.find(product => product.id === productId);
    store.dispatch(addToCart(product));
    store.dispatch(calculateTotal());
}

function handleRemoveFromCart(productId) {
    store.dispatch(removeFromCart(productId));
    store.dispatch(calculateTotal());
}

// Initial Render
renderProducts();
updateCart();
