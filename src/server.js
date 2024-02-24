const axios = require('axios');
const express = require('express');

const app = express();
const port = 3003;
const username = 'teste_fiqon';
const password = 'senha@115#';

const authHeader = {
  username: username,
  password: password
};

// Etapa 1 - Obter o token de API
axios.post('https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/autenticacao/57441afd5a59ccd4c62816683fcc8d665c42bb7b12857fc64a6cace4ababdc67f78c70b044', {}, { auth: authHeader })
  .then(response => {
    const apiToken = response.data.api_token;
    console.log('API Token:', apiToken);
    
    // Etapa 2 - Consumo de informações
    axios.get('https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/listar_pilares/76b07f1dbf18eabde7b8e3611ab078daa0f34b094cc9856d20d6d0b15fb3b7a99f697e451d', {
      headers: {
        'Authorization': `Bearer ${apiToken}` // Token
      }
    })
      .then(response => {
        // Verifica se a resposta contém os pilares da cultura como uma lista
        if (Array.isArray(response.data)) {
          // Concatena os pilares em uma única string separados por vírgula e espaço
          const pilaresConcatenados = response.data.join(', '); 
          // Converte a string para base64
          const base64String = Buffer.from(pilaresConcatenados).toString('base64'); 

          // Etapa 3 - Envio de informações
          axios.post('https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/envia_resposta/7b56940678e89802e02e1981a8657206d639f657d4c58efb8d8fb74814799d1c001ec121c6', {
            dados: base64String
          })
            .then(response => {
              console.log('Resposta do envio de informações:', response.data);
            })
            .catch(error => {
              console.error('Erro ao enviar informações:', error.message);
            });
        } else {
          console.error('A resposta da API não contém os pilares da cultura como uma lista.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter os pilares da cultura:', error.message);
      });

  })
  .catch(error => {
    console.error('Erro ao obter o token de API:', error.message);
  });
  
app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}.`)
});
