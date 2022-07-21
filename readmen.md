[//]: <> INSTALL DEPENDANCIES
1. cd client yarn install
2. cd server yarn install
[//]: <> CREATE DB USER
3. cd ./serc/utils npx ts-node registerDefaultUser.ts 'mongodb://localhost:27017' [//]: <> (Or any db you created)


DOCKER

docker compose up --build -d
docker exec -it dev_serv /bin/bash
yarn install
cd ./serc/utils npx ts-node registerDefaultUser.ts 'mongodb://mongo:27017'