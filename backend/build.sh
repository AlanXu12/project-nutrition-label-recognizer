docker build -t node-app .
# docker run -v ~/.config/gcloud:/root/.config/gcloud -p 8080:8080 -d --name node-app node-app
# docker run -p 8080:8080 -d --name node-app node-app
# sleep 5s
# docker logs node-app
# sleep 3s
docker tag node-app gcr.io/kubernetes-221921/node-app:latest
docker push gcr.io/kubernetes-221921/node-app
kubectl apply -f kubernetes/deployment.yaml