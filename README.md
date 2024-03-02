# API-Tranferencias 

Application Programming Interface (Interface de Programação de Aplicação) - API Fluxo de Revendedores e Lojistas.

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge)

# :clipboard: Descrição do Projeto

Consiste em uma API RestFull que controla operações de transferencias, 
Oferece conexão com Banco de Dados Remoto ou local Ex: ElephantSQL ou PostgresSQL.

# Funcionalidades do Projeto

✅ Cadastrar Usuário<br>

- Recebe dados do usuário (Ex: nome, email, senha)
- Faz as Validações Padrões de requisição (Ex: Campos Unicos)
- Criptografa a senha do usuário.
- Insere os dados no Banco de Dados

✅ Atualizar Saldo Usuario <br>

- Recebe o novo saldo , e o identificador do usuario 
- Faz as Validações Padrões de requisição (Ex: Verifica se o usuario tem cadastrado)
- Atualiza os saldo do usuário no Banco de Dados.

✅ Logar <br>

- Implementa a autenticação por meio de JWT, onde um token é gerado após validar as credenciais do usuário.


# :hammer_and_pick: Tecnologias Utilizadas

<div style="display:inline">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png " width="80px" height="80px" alt="logo-node.js">
<img src = "https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" width="80px" height="80px" alt="rest-api">
<img src = "https://user-images.githubusercontent.com/25181517/192107854-765620d7-f909-4953-a6da-36e1ef69eea6.png"  width="80px" height="80px" alt="http">
<img src = "https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png"  width="80px" height="80px" alt="vscode">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresSql Logo width="80px" height="80px">
<img src="./img/elephantsqlLogo.png" height="50px">
</div>

### :hammer_and_pick: Dependências Utilizadas no Projeto

- bcrypt :closed_lock_with_key: (Responsável pela Criptografia das senhas)
- express (processo de criação de servidores web)
- pg (conexao ao banco de dados PostgreSQL)
- nodemon dependência de desenvolvimento (automaticamente reinicia o servidor quando mudanças são detectadas)
- dotenv ( gerenciamento variáveis de ambiente)
- jsonwebtoken :key: (criação de tokens )
- Knex (query builder)
- cors (mecanismo de segurança )

# Arquitetura DDD (Domain-Driven Design)

# 🚀 Inicialização

- npm install : Esse comando vai ler o arquivo package.json no diretório do seu projeto, identificar todas as dependências listadas nele, e instalar todas no diretório node_modules local.

# Variáveis de Ambiente

- As variavéis de Ambiente estão no arquivo <p style="color:green ;display:inline">.env.example</p> neste Repositório

# Execução do Projeto

O projeto pode ser executado utilizando o <strong style ="color:purple">Insomia</strong>
Path : http://localhost:porta
<br> Através das Rotas Abaixo:

```http
  POST /api/users
```

| Parâmetro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `nomeCompleto`    | `string` | **Obrigatório**.                 |
| `cpfCnpj`   | `string` | **Obrigatório** : Unico.               |
| `email`   | `string` | **Obrigatório**.:Unico |
| `senha`   | `string` | **Obrigatório**.: No mínimo 5 caracteres |
| `tipoUsuario`   | `lojista ou revendedor` |  |

```http
  POST/api/login
```

| Parâmetro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `email`   | `string` | **Obrigatório**. Email válido.           |
| `senha`   | `string` | **Obrigatório**  |

```http
  PATCH//api/users/1
```

| Parâmetro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `valor_deposito`    | `string` | **Obrigatório**.               |


```http
  POST/api/transferencias
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `remetente_id`   | `string` | id válido |
| `destinatario_id`   | `string` | id válido|
| `valor`   | `string` | **valor >=0|



# 🤝Contribuições

Siga os passos abaixo para contribuir:

1. Faça o fork do projeto (https://github.com/CarolinaSanches24/API-Transfer/)

2. Clone o seu fork para sua maquína (git clone https://github.com/user_name/REPO_NAME.git)

3. Crie uma branch para realizar sua modificação (git checkout -b feature/name_new_feature)

4. Adicione suas modificações e faça o commit (git commit -m "Descreva sua modificação")

5. Push (git push origin feature/name_new_feature)

6. Crie um novo Pull Request

Pronto, agora só aguardar a análise

# :black_nib: Autora

<div style="display:flex">
<div style="display:flex">
<div style="width:500px">
<p style="margin-right:50px">CAROLINA SANCHES</p>
<p style="font-size=16px; text-align:justify"><b>Desenvolvedora de Software</b> <br>
Graduada em Licenciatura em Informática<br>
Pós Graduanda de Engenharia de Software<br>
Técnica em Informática</p>
</div>
<img src="./assets/Carolina Sanches Moraes .png" alt="Autora Carolina Sanches" style="border-radius:50px" width="150px" height="150px">

<br>
</div>

