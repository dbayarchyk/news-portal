\c itdog_database

-- Table: public.user_roles

-- DROP TABLE public.user_roles;

CREATE SEQUENCE user_roles_id_seq;

CREATE TABLE public.user_roles
(
    id smallint NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
    role character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE user_roles_id_seq
    OWNED BY public.user_roles.id;

ALTER TABLE public.user_roles
    OWNER to admin;

INSERT INTO public.user_roles
  ( id, role )
VALUES
  (1, 'VISITOR'), 
  (2, 'USER'), 
  (3, 'WRITER'),
  (4, 'ADMIN');

-- Table: public.permissions

-- DROP TABLE public.permissions;

CREATE SEQUENCE permissions_id_seq;

CREATE TABLE public.permissions
(
    id bigint NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permissions_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE permissions_id_seq
    OWNED BY public.permissions.id;

ALTER TABLE public.permissions
    OWNER to admin;

INSERT INTO public.permissions
    (id, name)
VALUES
    (1, 'ARTICLE_VIEW_ALL_DRAFT'),
    (2, 'ARTICLE_VIEW_OWN_DRAFT'),
    (3, 'ARTICLE_VIEW_ALL_PUBLISHED'),
    (4, 'ARTICLE_VIEW_OWN_PUBLISHED'),
    (5, 'ARTICLE_VIEW_ALL_ARCHIVED'),
    (6, 'ARTICLE_VIEW_OWN_ARCHIVED'),
    (7, 'ARTICLE_CREATE'),
    (8, 'ARTICLE_UPDATE_ALL_DRAFT'),
    (9, 'ARTICLE_UPDATE_OWN_DRAFT'),
    (10, 'ARTICLE_UPDATE_ALL_PUBLISHED'),
    (11, 'ARTICLE_UPDATE_OWN_PUBLISHED'),
    (12, 'ARTICLE_UPDATE_ALL_ARCHIVED'),
    (13, 'ARTICLE_UPDATE_OWN_ARCHIVED'),
    (14, 'ARTICLE_PUBLISH_ALL_DRAFT'),
    (15, 'ARTICLE_PUBLISH_OWN_DRAFT'),
    (16, 'ARTICLE_PUBLISH_ALL_ARCHIVED'),
    (17, 'ARTICLE_PUBLISH_OWN_ARCHIVED'),
    (18, 'ARTICLE_ARCHIVE_ALL_PUBLISHED'),
    (19, 'ARTICLE_ARCHIVE_OWN_PUBLISHED'),
    (20, 'COMMENT_VIEW_ALL');

-- Table: public.user_roles_to_permissions

-- DROP TABLE public.user_roles_to_permissions;

CREATE SEQUENCE user_roles_to_permissions_id_seq;

CREATE TABLE public.user_roles_to_permissions
(
    id bigint NOT NULL DEFAULT nextval('user_roles_to_permissions_id_seq'::regclass),
    user_role_id smallint NOT NULL,
    permission_id bigint NOT NULL,
    CONSTRAINT user_roles_to_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT user_roles_to_permissions_fkey_permission_id FOREIGN KEY (permission_id)
        REFERENCES public.permissions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT user_roles_to_permissions_fkey_user_role_id FOREIGN KEY (user_role_id)
        REFERENCES public.user_roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER SEQUENCE user_roles_to_permissions_id_seq
    OWNED BY public.user_roles_to_permissions.id;

ALTER TABLE public.user_roles_to_permissions
    OWNER to admin;

INSERT INTO public.user_roles_to_permissions
    (id, user_role_id, permission_id)
VALUES
    (1, 1, 3),
    (2, 2, 3),
    (3, 3, 2),
    (4, 3, 3),
    (5, 3, 6),
    (6, 4, 1),
    (7, 4, 2),
    (8, 4, 3),
    (9, 4, 4),
    (10, 4, 5),
    (11, 3, 7),
    (12, 4, 7),
    (13, 4, 8),
    (14, 3, 9),
    (15, 4, 10),
    (16, 3, 11),
    (17, 4, 12),
    (18, 3, 13),
    (19, 3, 15),
    (20, 4, 14),
    (21, 3, 17),
    (22, 4, 16),
    (23, 3, 19),
    (24, 4, 18),
    (25, 1, 20),
    (26, 2, 20),
    (27, 3, 20),
    (28, 4, 20);

-- Table: public.users

-- DROP TABLE public.users;

CREATE SEQUENCE users_id_seq;

CREATE TABLE public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    role_id bigint NOT NULL DEFAULT 2,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_unique_email UNIQUE (email),
    CONSTRAINT users_unique_username UNIQUE (username),
    CONSTRAINT users_fkey_role_id FOREIGN KEY (role_id)
        REFERENCES public.user_roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER SEQUENCE users_id_seq
    OWNED BY public.users.id;

ALTER TABLE public.users
    OWNER to admin;

-- Table: public.article_statuses

-- DROP TABLE public.article_statuses;

CREATE SEQUENCE article_statuses_id_seq;

CREATE TABLE public.article_statuses
(
    id smallint NOT NULL DEFAULT nextval('article_statuses_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT article_statuses_pkey PRIMARY KEY (id),
    CONSTRAINT article_statuses_unique_name UNIQUE (name)
);

ALTER SEQUENCE article_statuses_id_seq
    OWNED BY public.article_statuses.id;

ALTER TABLE public.article_statuses
    OWNER to admin;

INSERT INTO public.article_statuses
  ( id, name )
VALUES
  (1, 'DRAFT'), 
  (2, 'PUBLISHED'), 
  (3, 'ARCHIVED');

-- Table: public.articles

-- DROP TABLE public.articles;

CREATE SEQUENCE articles_id_seq;

CREATE TABLE public.articles
(
    id bigint NOT NULL DEFAULT nextval('articles_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    author_id bigint NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    status_id smallint NOT NULL DEFAULT 1,
    created_date date NOT NULL,
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
);

ALTER SEQUENCE articles_id_seq
    OWNED BY public.articles.id;

ALTER TABLE public.articles
    OWNER to admin;

-- Table: public.comments

-- DROP TABLE public.comments;

CREATE SEQUENCE comments_id_seq1;

CREATE TABLE public.comments
(
    id bigint NOT NULL DEFAULT nextval('comments_id_seq1'::regclass),
    author_id bigint NOT NULL,
    article_id bigint NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    parent_comment_id bigint,
    created_date date NOT NULL,
    CONSTRAINT comments_pkey1 PRIMARY KEY (id),
    CONSTRAINT comments_fkey_article_id FOREIGN KEY (article_id)
        REFERENCES public.articles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_fkey_author_id FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_fkey_parent_comment_id FOREIGN KEY (parent_comment_id)
        REFERENCES public.comments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER SEQUENCE comments_id_seq1
    OWNED BY public.comments.id;

ALTER TABLE public.comments
    OWNER to admin;