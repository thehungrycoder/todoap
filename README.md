### Installation
- Run the docker compose with the following command

```
docker-compose up
```

This will spin up multiple docker containers
  - `web` container running the app
  - `mongodb` container running the mongodb database for data persistence

- Then access the app using `http://localhost:8090`. See endpoints section for more info.


###  Endpoints 

List of Tasks
```
GET /tasks
```

Get task detail
```
GET /tasks/<id>
```




### Testing
```
npm test
```  
  
