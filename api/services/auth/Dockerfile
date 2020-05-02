FROM python:3.7-alpine

WORKDIR /usr/src/app

ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0

COPY requirements.txt requirements.txt

# Need this to properly install "psycopg2" python package
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["flask", "run"]
