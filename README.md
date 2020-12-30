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

`kubectl create secret generic comment-generic-secret --from-literal MONGODB_URL='mongodb+srv://news-portal-service:!newsportal24@newsportal.qyreo.mongodb.net/itdog-comment-service?retryWrites=true&w=majority'`

`kubectl create secret generic market-generic-secret --from-literal MONGODB_URL='mongodb+srv://news-portal-service:!newsportal24@newsportal.qyreo.mongodb.net/itdog-market-service?retryWrites=true&w=majority'`

`kubectl create secret generic auth-generic-secret --from-literal MONGODB_URL='mongodb+srv://news-portal-service:!newsportal24@newsportal.qyreo.mongodb.net/itdog-auth-service?retryWrites=true&w=majority' --from-literal ACCESS_TOKEN_SECRET='access' --from-literal REFRESH_TOKEN_SECRET='refresh'`

`kubectl create secret generic analytics-generic-secret --from-literal GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL='itdog-analytics-service@snappy-stacker-296420.iam.gserviceaccount.com' --from-literal GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUWQdweIbXhu4X\nF1plQ/9kotVZl19n0EfmFSC4PbrT2n/too6/BEQRj+0fCxbTww6Mv3y3b2NqABuM\nEiUVKju7jzMRYSUZoGWWJNpG8TMf7i5EIbs/iZI7N1Hcrf25hPtLL1BiJq65UnbW\nhgCBl8u7octWJPBzcY9P9HDyifmC0w1zApsGzyleUkzvCDDZwQVAeqmiFZ+TrPB+\nkLLnNgQZ5jZhY2c7tEQT8Pt5naf8yPCXbHKG4lVrYXHqXvVlPDFFl4xxgZlQUoUM\n6C91LCiRuuYN+mkCb3zunJrC1+w6lS80UTs6fqhx3AH4eFQ2W0nM2gmIylLmBgSJ\nmRdGiM/xAgMBAAECggEAOk+SU+e8+31RbyTaDVnNTYjLdnUzXTIcNEnT+NP2tEtZ\nett7QGf++yWfMzmb1J3JJoxExqh/T7Hk3qNy7GtzCK+rkdev1OgvTTokeHuuktOY\nf9wVa76u2bT4tVVQCbxDN2OwOqutqjVDbehRRkT1TLqCuE6feswR0x5oT6nkyvAC\npwXzCKmQg64lVq/SJv4fmahvSZnVbp2TBEUk4fVSAWbvPT+VVuHNkdfobssPwRy6\nys0jacuf4Yrwi+TrEnmoOBA1h4Kq5qzkqohLS2jc8flLTkGPbnEk+hpTEPhtfHel\n7ZJ4tIKQegorU2cZPR6RUFRacaeLNxqze3QeBEqCqwKBgQDyzaNAs8GYhNc2SfUy\nzbE5sr6gDV+1dkYWxkAWlCdOdUxVkbbYwt26nFDxRtG1nS7JbiwVDCsT8gvmAkF3\nXs1WW1cEfIX/ej4WeuOnmJNDCOMS5bdecatT3J9AzPOEnjqyKQLWTeEgGGtr10+U\neKx0r3Ooh+pmA01RmSZ3bLjnswKBgQDf46JAjBKMle5huDYuH4R+4ICKzNkJGPwc\nhAANZ49VGEW+Ejpp+nJt539174UI1t8uW8lkM5yYeo2OXrdvgpI8riU5kvvsGC+u\noGZUeJYTNMjBsDKhTPC/84Ih1OW+FC7P5s5sG7Bqnh+BhDkbD/ESdFc2EK+a2unE\nUBhcNIgXywKBgQCR0IlgTBPRwsV0ZwoITptGaWAtwppd4f/JoZnPdX39klgbc3z5\nxF1guoupurwqc5EriyySH1Knkc8vfN9QDvEGEai6mwXmHcW3vmmFtw2JTocATFDJ\nOT6JCI/jXLJKTLQ3VoXLqc2vdrrcctvp8GaxVMUCy00rooQGoxEE25hYHQKBgQC0\nRVSihmZ1HlAIDMxLTQNhKaE2oYRrx9tPlpV4NZd6XAXj6kdwh8DVb534tvg2StT/\nPdalwMzpFVyfcvJebhMTmuDMP+ZqjnruL6bVgxbLtiejlRzfNdVvqUFxvjuSVivv\nKJezAoSFBHa30WAtwyNHybdjCAJtPLEXaaqDq6SdCwKBgEGANg+qTfWc2YN1yJYU\nAwzWI6Pw906c8DLbdxuyWF8KlfIJ0YcI3ezpcYMPrVSDqj4Gs2XBRTj/xLWfDxP1\nx4AJreyLmO+vvIuCtQTtqDIoaQhCzg7CGptu4K/FkTmpj+23mqx8CLrG7QAm/feO\nqucxnAmhpCv62QxGT1QHJMzO\n-----END PRIVATE KEY-----\n'`
