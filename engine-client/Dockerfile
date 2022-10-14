FROM python:3

WORKDIR /usr/src/app

# Install OpenJDK-11
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

#COPY requirements.txt ./
#RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8500

CMD [ "python", "-m", "http.server", "8500" ]
