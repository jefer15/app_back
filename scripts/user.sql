CREATE TABLE public.user (
    id SERIAL NOT NULL,
    identification VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_public_user_id PRIMARY KEY (id) 
);