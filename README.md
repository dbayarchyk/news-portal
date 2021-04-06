# News Portal - IT Dog 📰

Welcome to a news portal project - IT Dog 👋! This is a mass media portal about the IT market in Germany 🇩🇪.

This is a monorepo that contains all the necessary services:

- [🖥 Web](./web/README.md)
- [📊 Market service](./api/services/market/README.md)
- [💬 Comment service](./api/services/comment/README.md)
- [🔐 Auth service](./api/services/auth/README.md)
- [📈 Analytics service](./api/services/analytics/README.md)
- [📧 Email service](./api/services/email/README.md)

## Development 👨‍💻

TODO: write a short overview how to start the project locally using the following tools:

- Minikube
- Kubernetes
- Docker
- Helm
- Skaffold

## CI / CD 🚀

For continuous integration and continuous deployment we use [Github Actions](https://docs.github.com/en/actions).
This tool helps us to:

- Lint all our internal services to keep the code style consistent
- Run all our tests to make sure we ship a robust product
- Create all our Docker images and push them to Docker hub
- Deliver every part of the application to one of our environments (Preview or Production)
- Run Lighthouse CLI to check usability metrics

## Infrastructure 🏘

TODO: write a short overview about the tools we use to build our infrastructure:

- Kubernetes and Helm
- Terraform
