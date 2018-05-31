FROM java:8-jre
MAINTAINER Sanak Alex <sanak.alex@gmail.com>

ADD ./target/bucket-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/bucket-service.jar"]

EXPOSE 8000