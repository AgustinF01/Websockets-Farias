**Practicas de WebSockets**

**Video mostrando la funcionalidad: https://github.com/AgustinF01/Websockets-Farias/blob/main/Prueba%20del%20chat.mkv**

**Funciones:**
- Conexion de multiples usuarios.
- Actualizacion en tiempo real de los usuarios conectados y desconectados.
- Si entran mas usuarios que los nombres añadidos por defecto se genera un nombre generico para distinguir a los usuarios.
- Mensajes en tiempo real.
- Guardado de las conversaciones para continuar la conversacion a pesar de reiniciar el servidor.

**Problemas conocidos:**
- El puerto de comunicacion se cierra luego de enviar un mensaje por lo que al momento de enviar dos mensajes seguidos, el segundo se visualiza como si fuera de entrada y no salida.
