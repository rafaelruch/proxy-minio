const express = require('express');
const app = express();

const processed = new Set();

app.get('/check/:id', (req, res) => {
  const id = req.params.id;
  
  if (processed.has(id)) {
    return res.json({ processed: true });
  }
  
  processed.add(id);
  
  // Limpa após 60 segundos
  setTimeout(() => processed.delete(id), 60000);
  
  res.json({ processed: false });
});

app.listen(3003, () => console.log('Dedupe service running'));
