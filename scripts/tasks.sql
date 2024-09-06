CREATE TABLE public.tasks (
    id SERIAL NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status CHAR(1) NOT NULL DEFAULT 'P' CHECK (status IN ('P', 'C')),
	log JSONB,
	constraint pk_public_tasks_id primary key (id)
);