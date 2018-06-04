FROM java:8-jre
MAINTAINER Sanak Alex <sanak.alex@gmail.com>

ADD ./target/hazelcast-server.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/hazelcast-server.jar"]

EXPOSE 5701