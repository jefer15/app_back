CREATE TABLE public.user (
    id SERIAL NOT NULL,
    identification VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_public_user_id PRIMARY KEY (id) 
);