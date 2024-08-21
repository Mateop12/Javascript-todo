class BookStore {
    constructor() {
        this.books = [
            { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', price: 45000 },
            { id: 2, title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez', price: 35000 },
            { id: 3, title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', price: 40000 },
        ];
        this.bookList = document.getElementById('book-list');
        this.cartItems = document.getElementById('cart-items');
        this.cartCount = document.getElementById('cart-count');
        this.totalPrice = document.getElementById('total-price');
        this.cart = [];
        this.checkoutButton = document.getElementById('checkout-button');
        this.checkout = document.getElementById('checkout');
        this.orderSummary = document.getElementById('order-summary');
        this.checkoutForm = document.getElementById('checkout-form');
        this.orderSummary = document.getElementById('order-summary');
        this.init();

        
    }

    init() {
        this.renderBooks();
        this.bookList.addEventListener('click', this.handleAddToCart.bind(this));
        this.cartItems.addEventListener('click', this.handleRemoveFromCart.bind(this));
        this.checkoutButton.addEventListener('click', this.showCheckout.bind(this));
        this.checkoutForm.addEventListener('submit', this.handleCheckout.bind(this));
    }

    renderBooks() {
        this.books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Autor: ${book.author}</p>
                <p>Precio: ${book.price} COP</p>
                <button data-id="${book.id}">Agregar al Carrito</button>
            `;
            this.bookList.appendChild(bookElement);
        });
    }

    handleAddToCart(e) {
        if (e.target.tagName === 'BUTTON') {
            const bookId = parseInt(e.target.getAttribute('data-id'));
            const book = this.books.find(b => b.id === bookId);
            this.addToCart(book);
        }
    }

    handleRemoveFromCart(e) {
        if (e.target.tagName === 'BUTTON') {
            const bookId = parseInt(e.target.getAttribute('data-id'));
            this.removeFromCart(bookId);
        }
    }

    addToCart(book) {
        const cartItem = this.cart.find(item => item.book.id === book.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.push({ book, quantity: 1 });
        }
        this.updateCart();
    }

    removeFromCart(bookId) {
        const cartIndex = this.cart.findIndex(item => item.book.id === bookId);
        if (cartIndex !== -1) {
            this.cart.splice(cartIndex, 1);
        }
        this.updateCart();
    }

    updateCart() {
        this.cartItems.innerHTML = '';
        let total = 0;
        this.cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.book.title} - ${item.quantity} x ${item.book.price} COP
                <button data-id="${item.book.id}">Eliminar</button>
            `;
            this.cartItems.appendChild(li);
            total += item.quantity * item.book.price;
        });
        this.cartCount.textContent = this.cart.length;
        this.totalPrice.textContent = total + ' COP';
        
    }

    

    showCheckout() {
        document.querySelector('main').style.display = 'none';
        //checkoutBar.style.display = 'none';
        checkout.style.display = 'block';
        this.orderSummary.innerHTML = '';
        
        let total = 0;
        
        this.cart.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                ${item.book.title} - ${item.quantity} x ${item.book.price} COP
            `;
            this.orderSummary.appendChild(div);
            total += item.quantity * item.book.price;
        });

        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<strong>Total: ${total} COP</strong>`;
        this.orderSummary.appendChild(totalDiv);
        
    }

    showMain() {
     document.querySelector('main').style.display = 'flex';
    //     checkoutBar.style.display = 'flex';
    checkout.style.display = 'none';

    }

    handleCheckout(event) {
        event.preventDefault();
        alert('¡Gracias por tu compra!');
        this.cart = [];
        this.updateCart();
        this.showMain();
    }
}

const toggleSidebar = () => document.body.classList.toggle("open");


document.addEventListener('DOMContentLoaded', function () {
    new BookStore();
});
