https://adoptium.net/temurin/releases/?version=17&os=mac

mvn install:install-file -Dfile=./sdk/mpp-server-sdk-1.2.1.20240506.jar -DpomFile=./sdk/mpp-server-sdk-1.2.1.20240506.pom
mvn install:install-file -Dfile=./sdk/mpp-server-sdk-framework-1.2.1.20240506.jar -DpomFile=./sdk/mpp-server-sdk-framework-1.2.1.20240506.pom

mvn clean install
mvn spring-boot:run

---
Build

mvn package
docker build -t demo-application .
