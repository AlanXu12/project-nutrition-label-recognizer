start_time=`date +%s`

docker rmi nuxpert
docker rmi gcr.io/kubernetes-221921/nuxpert
kubectl delete -f kubernetes/deployment.yaml
docker build --no-cache -t nuxpert . 

docker tag nuxpert gcr.io/kubernetes-221921/nuxpert:latest
docker push gcr.io/kubernetes-221921/nuxpert
sleep 3s
kubectl apply -f kubernetes/deployment.yaml

end_time=`date +%s`
echo execution time was `expr $end_time - $start_time` s.