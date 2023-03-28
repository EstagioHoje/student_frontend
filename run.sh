FILE=docker-compose.yml

docker-compose -f $FILE down
docker-compose -f $FILE up --build