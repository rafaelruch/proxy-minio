const express = require('express');
const axios = require('axios');
const app = express();

app.get('/chatwoot/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const minioUrl = `https://s3minio.ruch.com.br/chatwoot/${filename}`;
    
    // Busca a imagem do MinIO
    const response = await axios.get(minioUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    
    // Retorna a imagem com Content-Type correto
    res.set('Content-Type', contentType);
    res.send(response.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.get('/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const minioUrl = `https://s3minio.ruch.com.br/chatwoot/${filename}`;
    
    const response = await axios.get(minioUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    
    res.set('Content-Type', contentType);
    res.send(response.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
