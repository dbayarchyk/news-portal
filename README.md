# News Portal - IT Dog 📰

Welcome to a news portal project - IT Dog 👋! This is a mass media portal about the IT market in Germany 🇩🇪.

This is a monorepo that contains all the necessary services:

- [🖥 Web](./web/README.md)
- [📊 Market service](./api/services/market/README.md)
- [💬 Comment service](./api/services/comment/README.md)
- [🔐 Auth service](./api/services/auth/README.md)
- [📈 Analytics service](./api/services/analytics/README.md)

## CI / CD 🚀

For continuous integration and continuous delivery we use [CircleCI](https://circleci.com/).
This tool helps us to:

- Lint all our internal services to keep the code style consistent
- Run all our tests to make sure we ship a robust product
- Create all our Docker images and push them to Docker hub
- TODO: Deliver every part of the application to one of our environments

## Infrastructure 🏘

TODO: write a short overview about the tools we use to build our infrastructure:

- Kubernetes
- Terraform

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml`

`minikube addons enable ingress`

`kubectl create secret generic comment-generic-secret --from-literal MONGODB_URL='mongodb://itdog-comment-service:!itdog24@ds163825.mlab.com:63825/itdog-comment-service'`

`kubectl create secret generic market-generic-secret --from-literal MONGODB_URL='mongodb://itdog-market-service:!itdog24@ds163825.mlab.com:63825/itdog-market-service'`

`kubectl create secret generic auth-generic-secret --from-literal MONGODB_URL='mongodb://itdog-auth-service:!itdog24@ds033754.mlab.com:33754/itdog-auth-service' --from-literal ACCESS_TOKEN_SECRET='access' --from-literal REFRESH_TOKEN_SECRET='refresh'`
