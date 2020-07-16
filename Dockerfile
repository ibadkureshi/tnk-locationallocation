FROM python:3.7.2-stretch

EXPOSE 8000

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt /requirements.txt 
RUN pip install -r /requirements.txt

RUN mkdir -p /app/broker/out/data_in
RUN mkdir -p /app/broker/out/data_out
RUN mkdir -p /app/broker/processed
RUN mkdir -p /tmp/results
RUN chmod -R 777 /tmp/results/
RUN mkdir /prsapp
COPY . /prsapp/
WORKDIR /prsapp

CMD ./init.sh
