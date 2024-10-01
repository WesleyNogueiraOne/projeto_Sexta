const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://projetofrontend.vercel.app',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);
  
  socket.on('novaPalavra', (palavra) => {
    console.log(`Nova palavra recebida: ${palavra}`);
    io.emit('atualizarMural', palavra);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando em http://192.168.1.13:${PORT}`));