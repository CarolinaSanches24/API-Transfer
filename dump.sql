# Comandos SQL para criação de tabelas 

CREATE TABLE usuarios (
    id serial primary key,
    nome_completo varchar(100) NOT NULL,
    cpf_cnpj varchar(20) UNIQUE,
    email varchar(50) UNIQUE,
    senha text NOT NULL,
    saldo INTEGER DEFAULT 0 CHECK (saldo >= 0),
    tipo_usuario varchar(15) CHECK (tipo_usuario IN ('lojista', 'revendedor'))
);


CREATE TABLE transferencias (
    id serial primary key,
    remetente_id integer,
    destinatario_id integer,
    valor INTEGER NOT NULL,
    data_transferencia DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);