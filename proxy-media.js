// proxy-media.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/media/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const minioUrl = `https://s3minio.ruch.com.br/chatwoot/${filename}`;
    
    // Busca metadados do arquivo
    const headResponse = await axios.head(minioUrl);
    const contentType = headResponse.headers['content-type'];
    
    // Mapeia Content-Type para extensão
    const extensions = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'video/mp4': '.mp4',
      'application/pdf': '.pdf'
    };
    
    const ext = extensions[contentType] || '';
    
    // Redireciona para URL com extensão como query param
    // A Evolution vai ver isso como nome de arquivo
    res.redirect(`${minioUrl}?filename=${filename}${ext}`);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
