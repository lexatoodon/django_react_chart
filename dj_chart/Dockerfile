FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /backend
WORKDIR /backend

RUN apt update
RUN pip3 install -r requirements.txt

EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000