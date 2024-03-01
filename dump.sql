# Comandos SQL para criação de tabelas 

CREATE TABLE usuarios (
    id serial primary key,
    nome_completo varchar(100) NOT NULL,
    cpf_cnpj varchar(20) UNIQUE,
    email varchar(50) UNIQUE,
    senha text NOT NULL,
    tipo_usuario varchar(15) CHECK (tipo_usuario IN ('logista', 'revendedor'))--para o tipo de usuario tenho revendedor, lojista
);