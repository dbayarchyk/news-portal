FROM python:3.7

# Specifies that we need to expose this port when running the container e.g docker run -p 8000:8000.
EXPOSE 8000

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt

# Need this to properly install "psycopg2" python package
# RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
