start_time=`date +%s`
# docker stop nuxpert

docker rmi nuxpert
docker rmi gcr.io/kubernetes-221921/nuxpert
kubectl delete -f kubernetes/deployment.yaml
docker build --no-cache -t nuxpert . 

# docker run -p 8080:8080 -d --name nuxpert nuxpert
# docker exec -it nuxpert bash

docker tag nuxpert gcr.io/kubernetes-221921/nuxpert:latest
docker push gcr.io/kubernetes-221921/nuxpert
sleep 3s
kubectl apply -f kubernetes/deployment.yaml

# sleep 5s
# docker logs node-app
# docker tag node-app gcr.io/kubernetes-221921/node-app:latest
# docker push gcr.io/kubernetes-221921/node-app
# sleep 3s
# kubectl apply -f kubernetes/deployment.yaml
end_time=`date +%s`
echo execution time was `expr $end_time - $start_time` s.