FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirments.txt /app/

RUN pip install --no-cache-dir -r requirments.txt

COPY . /app/

ENV DJANGO_SETTINGS_MODULE=sample.settings

EXPOSE 8000

CMD [ "python3","manage.py", "runserver", "0.0.0.0:8000" ]
