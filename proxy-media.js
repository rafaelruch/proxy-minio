const express = require('express');
const axios = require('axios');
const app = express();

app.get('/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    // Remove a extensão se vier na URL
    const filenameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const minioUrl = `https://s3minio.ruch.com.br/chatwoot/${filenameWithoutExt}`;
    
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
    
    // Redireciona com extensão
    res.redirect(302, `${minioUrl}?filename=file${ext}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
