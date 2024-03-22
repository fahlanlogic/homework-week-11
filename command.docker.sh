docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker system prune
docker volume rm $(docker volume ls -qf dangling=true)