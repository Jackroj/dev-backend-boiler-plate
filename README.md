boiler plate using the express, sequelize, pino, passport js

## Basic repository setup 

After cloned the repo using the following steps to setup the boiler-plate

```
npm install
```
before running try migrating the table to your local env. Make sure mysql is already in running state

And add your db config in config.json file based on your env, similar to below line

```
"development": {
      "username": "root",
      "password": "Q2yz",
      "database": "backend_boilerplate",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
```
## To run db migration 
``````
npm run db-migrate

``````

### if you want to migrate new table use the following command to execute
#### Generate migration file using sequelize-cli 
``````
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
``````

