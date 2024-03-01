# Comandos SQL para criação de tabelas 

CREATE TABLE usuarios (
    id serial primary key,
    nome_completo varchar(100),
    cpf_cnpj varchar(20),
    email varchar(50),
    senha text,
    tipo_usuario varchar(15) --para o tipo de usuario tenho revendedor, lojista
);