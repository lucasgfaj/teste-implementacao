### Etapa 1 - Autenticação

No primeiro endpoint é onde você deve realizar a autenticação, utilizando Basic Auth. Você deve enviar uma requisição conforme a documentação ao final desta página. Caso seja enviado corretamente o endpoint retornará um API Token.

### Etapa 2 - Consumo de informações

Após receber o token de API, você deve utilizar esse token conforme a documentação e obter os pilares da cultura da FiqOn. A resposta tem uma paginação, você deve percorrer a paginação para obter todos os pilares da cultura.

### Etapa 3 - Envio de informações

Agora que você conhece os 5 pilares da cultura da FiqOn, você deve concatenar todos em uma única string, converter em base64 e enviar para o terceiro e último endpoint, conforme documentação. Como retorno você receberá uma resposta informando se está correto ou se é necessário ajustar o código.

# NodeJS

- axios: "1.6.7"
- express: "4.18.2"
- nodemon: "3.1.0"
