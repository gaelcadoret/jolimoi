# JOLIMOI Conversion tool

## Start client
`yarn start`

Then, go to http://localhost:3000/client/

## Start server
`yarn start:server`

Server is now listening http://localhost:8080 for API calls.

## API documentation (swagger)
`yarn docs`

Then, go to http://localhost:3002/api-docs


`curl -X POST  -H "Content-Type: application/json"  -d '{ "fruit": "Groseilles" }' -s http://localhost:8080/fact`
`curl -X POST  -H "Content-Type: application/json"  -d '{ "fruit": "Pommes" }' -s http://localhost:8080/fact`
