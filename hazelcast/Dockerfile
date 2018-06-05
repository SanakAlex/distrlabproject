FROM java:8-jre
MAINTAINER Sanak Alex <sanak.alex@gmail.com>

ADD ./target/hazelcast.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/hazelcast.jar"]

EXPOSE 8701