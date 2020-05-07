# TIAW-api-controle-calorias
API do controle de calorias para o Trabalho Interdisciplinar - Aplicações Web / PUC-MG

*O Projeto se encontra em fase de DESENOLVIMENTO*

##### Dependências
* Node.js v12+
* Yarn 1.19+ (ou npm)
* MongoDB

#### O que está sendo utilizado?
* node.js
* moongose
* nodemon
* sucrase
* express
* bcrypt
* jsonwebtoken
* node-schedule

Antes de tudo, certifique-se de ter em sua maquina o node.js instalado na vesão 12 ou superior e o npm ou yarn.
Iremos utilizar aqui o yarn.

Após fazer o clone do projeto, através do terminal acesse a raiz dele e instale as dependencias
```yarn``` ou ```npm install```
Renomeie o arquivo dentro da pasta config/ para .env

##### Editando o arquivo .env

Em PORT você deve colocar a porta em que deseja que a aplicação irá rodar
```PORT=3000```
Em SECRET você deve colocar uma string que será usar para a criação dos tokens de autenticação
```SECRET=stringdoquevaiserusadaparacriarotoken```
E por fim em DATABASE você deve colocar a String de conexão com o BD (Como informado é necessario usar MONGODB)
```DATABASE=stringdeconexaocomobancodedados```

##### Iniciando a aplicação
Após seguir esses passos, no terminal no diretorio raiz basta executar o comando a seguir:
```yarn dev``` ou ```npm dev```

E se tudo ocorreu bem você vera a seguinte mensagem:
`Server is running on port 3000`

Tudo certo, agora basta consumir a API através de um client ou via POSTMAN para realizar testes!
