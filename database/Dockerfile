FROM postgres:12.2-alpine

# Specifies that we need to expose this port when running the container e.g docker run -p 5432:5432.
EXPOSE 5432

# For initializing the database with predefined tables and data
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql