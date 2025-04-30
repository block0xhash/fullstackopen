#curl http://localhost:3001/api/persons | jq
#curl http://localhost:3001/info
#curl -X DELETE http://localhost:3001/api/persons/1
#curl -X DELETE http://localhost:3001/api/persons/1
#curl -X POST -H "Content-Type: application/json" -d '{"content": "Remember to call John"}' http://localhost:3001/api/person

curl -X POST -H "Content-Type: application/json" -d '{"name": "John1", "number" : 1234567890}' http://localhost:3001/api/persons


