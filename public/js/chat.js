const socket = io();
let usuario = ''; // Variable para almacenar el nombre del usuario

// Asignar el nombre de usuario al conectarse
socket.on('connect', () => {
    usuario = prompt("Por favor, ingresa tu nombre de usuario"); // Pedir el nombre al usuario
});

// Manejar el envío del formulario
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario

    const messageInput = document.getElementById('m');
    const message = messageInput.value;

    if (message) {
        // Enviar el mensaje junto con el nombre del usuario
        socket.emit('chat message', { user: usuario, message: message });
        messageInput.value = ''; // Limpiar el campo de entrada
    }
});

// Manejar la recepción de mensajes
socket.on('chat message', (data) => {
    const li = document.createElement('li');

    // Crear un elemento para el nombre de usuario
    const userName = document.createElement('span');
    userName.textContent = data.user; // Usar el nombre del usuario
    userName.style.color = getRandomDarkColor(); // Cambiar el color aleatoriamente
    li.appendChild(userName);

    // Crear un elemento para el mensaje
    const msgText = document.createElement('span');
    msgText.textContent = data.message; // Usar el mensaje
    li.appendChild(msgText);

    document.getElementById('messages').appendChild(li);
});

// Función para obtener un color oscuro aleatorio
function getRandomDarkColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r}, ${g}, ${b})`;
}