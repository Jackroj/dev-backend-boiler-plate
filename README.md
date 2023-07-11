
## Generate migration file using sequelize-cli 
``````
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
``````

## To run db migration 
``````
npm run db-migrate

``````