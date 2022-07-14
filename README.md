# Ms-Auth

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25d20354cdc5e003be29?action=collection%2Fimport)

## Install & Run project

```bash
npm install -g foreman
npm install -g babel
npm install -g babel-env --save-dev
npm install
source ./envload.sh ./.env_production
nf start dev=1
```
## To run unit test:
```bash
nf start test=1
```


## Build with Docker envs to push on AWS

## For Staging
docker build -f ./docker_env/staging -t ms-auth . 

## For Production
docker build -f ./docker_env/production -t ms-auth .

