. ./define_docker_config.sh

echo -e "\033[93m$ docker build\033[0m"
docker build -t $IMAGE_NAME .
echo -e "\033[93m$ docker stop\033[0m"
docker stop $CONTAINER_NAME || true
echo -e "\033[93m$ docker rm\033[0m"
docker rm $CONTAINER_NAME || true
echo -e "\033[93m$ docker run\033[0m"
docker run -dp 80:80 --name $CONTAINER_NAME $IMAGE_NAME
