const express = require('express');
const app = express();

const processed = new Map(); // Mudei para Map para armazenar timestamp

app.get('/check/:id', (req, res) => {
  const id = req.params.id;
  const now = Date.now();
  
  // Verifica se existe e não expirou (60 segundos)
  if (processed.has(id)) {
    const timestamp = processed.get(id);
    if (now - timestamp < 60000) {
      return res.json({ processed: true });
    } else {
      processed.delete(id); // Limpa se expirou
    }
  }
  
  // Marca IMEDIATAMENTE antes de responder
  processed.set(id, now);
  
  res.json({ processed: false });
});

// Limpa entradas antigas a cada minuto
setInterval(() => {
  const now = Date.now();
  for (const [id, timestamp] of processed.entries()) {
    if (now - timestamp > 60000) {
      processed.delete(id);
    }
  }
}, 60000);

app.listen(3003, () => console.log('Dedupe service running on port 3003'));
