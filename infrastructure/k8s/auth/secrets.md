`kubectl create secret generic auth-generic-secret --from-literal MONGODB_URL='mongodb://<dbuser>:<dbpassword>@ds033754.mlab.com:33754/itdog-auth-service' --from-literal ACCESS_TOKEN_SECRET='<secret>' --from-literal REFRESH_TOKEN_SECRET='<secret>'`