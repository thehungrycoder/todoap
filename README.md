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

List completed tasks
```
GET /tasks?status=completed
```

List overdue tasks
```
GET /tasks?status=overdue
```

List tasks due today
```
GET /tasks?due_date=today
```

List tasks due tomorrow
```
GET /tasks?due_date=tomorrow
```

List tasks due at a specific time 
```
GET /tasks?due_date=<ISO8601_Date>
```



Create a task

```
POST /tasks
```

Example:
```
curl -X POST \
  http://localhost:8090/tasks \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Foo task",
	"description": "Task details",
	"due_date": "2019-07-20T03:40:18.240-04:00"
}'
```

Get task detail
```
GET /tasks/<id>
```

Mark task completed
```
PUT /tasks/<id>
```
Request body:
```
{
  "status": "completed"
}
```

Example
```
curl -X PUT \
  http://localhost:8090/tasks/5d380f8b9fa695003eb9337d \
  -H 'Content-Type: application/json' \
  -d '{
	"status": "completed"
}'
```

Delete a task
```
DELETE /tasks<id>
```




### Testing
```
npm test
```  
  
