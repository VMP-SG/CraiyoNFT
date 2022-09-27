## Deployment Steps

```bash
gcloud init
gcloud auth login
gcloud auth configure-docker
docker build . -t craiyonft-backend
gcloud builds submit --tag gcr.io/craiyonft/craiyonft-backend
```
