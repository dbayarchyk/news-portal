-- Database: itdog_database

-- DROP DATABASE itdog_database;

CREATE DATABASE itdog_database
    WITH 
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.user_roles

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles
(
    id bigint NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
    role character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.user_roles
    OWNER to admin;

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    role_id bigint NOT NULL DEFAULT 1,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_unique_email UNIQUE (email),
    CONSTRAINT users_fkey_role_id FOREIGN KEY (role_id)
        REFERENCES public.user_roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to admin;