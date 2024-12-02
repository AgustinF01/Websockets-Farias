const socket = io();
let usuario = '';

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
    li.appendChild(userName);

    // Crear un elemento para el mensaje
    const msgText = document.createElement('span');
    msgText.textContent = data.message; // Usar el mensaje
    li.appendChild(msgText);

    document.getElementById('messages').appendChild(li);
});