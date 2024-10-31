const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // Ou qualquer outra porta que preferir

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
