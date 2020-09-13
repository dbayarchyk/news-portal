# News Portal - IT Dog 📰

Welcome to a news portal project - IT Dog 👋! This is a mass media portal about the IT market in Germany 🇩🇪.

This is a monorepo that contains all the necessary services:

- [🖥 Web](./web/README.md)
- [📊 Market service](./api/services/market/README.md)
- [💬 Comment service](./api/services/comment/README.md)

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
