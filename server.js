const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const fs = require('fs');
const path = './conversaciones.json';
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Lista de usuarios predefinidos
const usuariosDisponibles = ['Juan', 'Marta', 'Sofia', 'Alberto'];
const usuariosConectados = []; 

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Asignar un usuario único de la lista disponible al socket
    let usuario;
    if (usuariosDisponibles.length > 0) {
        const usuarioIndex = Math.floor(Math.random() * usuariosDisponibles.length);
        usuario = usuariosDisponibles[usuarioIndex];
        usuariosDisponibles.splice(usuarioIndex, 1); // Eliminar el usuario asignado de la lista de disponibles
    } else {
        usuario = `Usuario${usuariosConectados.length + 1}`; // Nombre genérico si no hay más disponibles
    }

    console.log(`Usuario asignado: ${usuario}`);
    usuariosConectados.push(usuario); // Agregar el usuario a la lista de conectados

    // Enviar la lista de usuarios en línea a todos
    io.emit('update users', usuariosConectados);

    // Leer el archivo JSON y enviar los mensajes anteriores al nuevo usuario
    fs.readFile(path, (err, data) => {
        if (err) throw err;
        const conversaciones = JSON.parse(data);
        conversaciones.forEach(msg => {
            socket.emit('chat message', msg);
        });
    });

    socket.on('chat message', (msg) => {
        const mensajeConUsuario = `${usuario}: ${msg}`;
        io.emit('chat message', mensajeConUsuario);

        fs.readFile(path, (err, data) => {
            if (err) throw err;
            const conversaciones = JSON.parse(data);
            conversaciones.push(mensajeConUsuario);
            fs.writeFile(path, JSON.stringify(conversaciones), (err) => {
                if (err) throw err;
            });
        });
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${usuario}`);
        // Eliminar el usuario de la lista de usuarios conectados
        usuariosConectados.splice(usuariosConectados.indexOf(usuario), 1);
        // Agregar el usuario de nuevo a la lista de disponibles
        usuariosDisponibles.push(usuario);
        // Enviar la lista actualizada de usuarios en línea
        io.emit('update users', usuariosConectados);
    });
});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});