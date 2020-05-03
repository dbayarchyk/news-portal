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
    id smallint NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
    role character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
)

INSERT INTO public.user_roles
  ( id, name )
VALUES
  (1, 'VISITOR'), 
  (2, 'USER'), 
  (3, 'WRITER'),
  (4, 'ADMIN');

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

-- Table: public.articles

-- DROP TABLE public.articles;

CREATE TABLE public.articles
(
    id bigint NOT NULL DEFAULT nextval('articles_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    author_id bigint NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    status_id smallint NOT NULL DEFAULT 1,
    CONSTRAINT articles_pkey PRIMARY KEY (id),
    CONSTRAINT fkey_author_id FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fkey_status_id FOREIGN KEY (status_id)
        REFERENCES public.article_statuses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.articles
    OWNER to admin;

-- Table: public.article_statuses

-- DROP TABLE public.article_statuses;

CREATE TABLE public.article_statuses
(
    id smallint NOT NULL DEFAULT nextval('article_statuses_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT article_statuses_pkey PRIMARY KEY (id),
    CONSTRAINT article_statuses_unique_name UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE public.article_statuses
    OWNER to admin;

INSERT INTO public.article_statuses
  ( id, name )
VALUES
  (1, 'DRAFT'), 
  (2, 'PUBLISHED'), 
  (3, 'ARCHIVED');