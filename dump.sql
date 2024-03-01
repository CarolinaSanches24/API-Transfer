# Comandos SQL para criação de tabelas 

CREATE TABLE usuarios (
    id serial primary key,
    nome varchar(100),
    cpf/cnpj varchar(20),
    email varchar(50),
    senha text
)