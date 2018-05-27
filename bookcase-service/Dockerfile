FROM java:8-jre
MAINTAINER Sanak Alex <sanak.alex@gmail.com>

ADD ./target/bookcase-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/bookcase-service.jar"]

EXPOSE 6000