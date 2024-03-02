# Comandos SQL para criação de tabelas 

CREATE TABLE usuarios (
    id serial primary key,
    nome_completo varchar(100) NOT NULL,
    cpf_cnpj varchar(20) UNIQUE,
    email varchar(50) UNIQUE,
    senha text NOT NULL,
    tipo_usuario varchar(15) CHECK (tipo_usuario IN ('logista', 'revendedor'))--para o tipo de usuario tenho revendedor, lojista
);

CREATE table conta(
    id serial primary key,
    usuario_id integer,
    saldo DECIMAL(15,2) DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE transferencias (
    id serial primary key,
    remetente_id integer,
    destinatario_id integer,
    valor DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);