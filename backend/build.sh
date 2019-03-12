docker build -t node-app .
docker run -p 8080:8080 -d --name node-app node-app
printf '\n\n'
sleep 5s
docker logs node-app