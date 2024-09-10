CREATE TABLE public.inventory_transactions (
    id SERIAL NOT NULL,
    id_organization INTEGER NOT NULL,
    transaction_type VARCHAR(10) NOT NULL DEFAULT 'E',
    quantity INTEGER,
    unit_price DECIMAL(10, 2),
    total_value DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    description text,
    mark VARCHAR(50),
    transaction_date DATE,
    log JSONB,
    CONSTRAINT pk_public_inventory_transactions_id PRIMARY KEY (id),
    CONSTRAINT chk_trasaction_type CHECK (transaction_type IN ('E', 'S')),
    CONSTRAINT fk_public_inventory_transactions_id_organization FOREIGN KEY (id_organization) REFERENCES public.organizations (id) 
);
