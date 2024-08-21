class Book {
    constructor(title, author, comment) {
        this.title = title;
        this.author = author;
        this.comment = comment;
    }
}

class BookManager {
    constructor() {
        this.form = document.getElementById("form");
        this.titleInput = document.getElementById("title");
        this.authorInput = document.getElementById("author");
        this.commentInput = document.getElementById("comment");
        this.msg = document.getElementById("msg");
        this.card = document.getElementById("card");
        this.data = JSON.parse(localStorage.getItem("data")) || [];
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.renderBooks();
        
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.titleInput.value === "" || this.authorInput.value === "") {
            this.msg.innerHTML = "¡Datos incompletos!";
        } else {
            this.msg.innerHTML = "¡Libro agregado!";
            this.addBook();
        }
        setTimeout(() => (this.msg.innerHTML = ""), 5000);
    }

    addBook() {
        const newBook = new Book(this.titleInput.value, this.authorInput.value, this.commentInput.value);
        this.data.push(newBook);
        localStorage.setItem("data", JSON.stringify(this.data));
        this.renderBooks();
        this.resetForm();
    }

    renderBooks() {
        this.card.innerHTML = "";
        this.data.forEach((book, index) => {
            const bookElement = document.createElement("div");
            bookElement.id = index;
            bookElement.innerHTML = `
                <h4>${book.title}</h4>
                <i>${book.author}</i>
                <p>${book.comment}</p>
                <span>
                    <button class="editBtn" onclick="bookManager.editBook(${index})">Editar</button>
                    <button class="deleteBtn" onclick="bookManager.deleteBook(${index})">Borrar</button>
                </span>
            `;
            this.card.appendChild(bookElement);
        });
    }

    deleteBook(index) {
        this.data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(this.data));
        this.renderBooks();
        this.msg.innerHTML = "¡Libro Eliminado!";
    }

    editBook(index) {
        const selectedBook = this.data[index];
        this.titleInput.value = selectedBook.title;
        this.authorInput.value = selectedBook.author;
        this.commentInput.value = selectedBook.comment;
        this.deleteBook(index);
    }

    resetForm() {
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.commentInput.value = "";
    }

    
}

 function logout() {
    // Redirige a la página principal
    window.location.href = 'index.html';
}

function pagina(){
    window.location.href = 'compras.html';
}

//CLASE PARA INICIAR SESION

class AuthManager {
    constructor() {
        this.$btnSignIn = document.querySelector('.sign-in-btn');
        this.$btnSignUp = document.querySelector('.sign-up-btn');
        this.$signUp = document.querySelector('.sign-up');
        this.$signIn = document.querySelector('.sign-in');
        this.init();
    }

    init() {
        document.addEventListener('click', this.toggleSignInSignUp.bind(this));
        document.getElementById('registro').addEventListener('submit', this.registrarCliente.bind(this));
        document.getElementById('formulario').addEventListener('submit', this.iniciarSesion.bind(this));
    }

    toggleSignInSignUp(e) {
        if (e.target === this.$btnSignIn || e.target === this.$btnSignUp) {
            this.$signIn.classList.toggle('active');
            this.$signUp.classList.toggle('active');
        }
    }

    registrarCliente(event) {
        event.preventDefault();
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var contraseña = document.getElementById('contraseña').value;
        var confirmarContraseña = document.getElementById('confirmar-contraseña').value;

        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            return;
        }

        var cliente = {
            nombre: nombre,
            email: email,
            contraseña: contraseña
        };

        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        alert('¡Registro exitoso! Por favor, inicia sesión para continuar.');
        location.reload();
    }

    iniciarSesion(event) {
        event.preventDefault();
        var email = document.getElementById('emaillogin').value;
        var contraseña = document.getElementById('password').value;

        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var clienteEncontrado = false;

        for (var i = 0; i < clientes.length; i++) {
            var cliente = clientes[i];
            if (cliente.email === email && cliente.contraseña === contraseña) {
                clienteEncontrado = true;
                break;
            }
        }

        if (clienteEncontrado) {
            window.location.replace('vista.html');
        } else {
            alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new AuthManager();
});


const toggleSidebar = () => document.body.classList.toggle("open");

// Crear instancia de BookManager
const bookManager = new BookManager();
