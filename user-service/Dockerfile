FROM java:8-jre
MAINTAINER Sanak Alex <sanak.alex@gmail.com>

ADD ./target/user-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/user-service.jar"]

EXPOSE 7000