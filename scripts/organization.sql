CREATE TABLE public.organizations (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    type CHAR(1) NOT NULL DEFAULT 'C', -- Corregido
    log JSONB,
    CONSTRAINT pk_public_organizations_id PRIMARY KEY (id),
    CONSTRAINT chk_type_status CHECK (type IN ('P', 'C')) -- Corregido
);