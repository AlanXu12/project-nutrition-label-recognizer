docker build -t node-app .
docker run -v ~/.config/gcloud:/root/.config/gcloud -p 8080:8080 -d --name node-app node-app
sleep 5s
docker logs node-app