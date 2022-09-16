const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const convertor = require("./modules/convertor");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 *
 * /status:
 *    get:
 *        description: get server status
 *        produces:
 *            - application/json
 */
app.get("/status", (req, res) => res.json({clients: clients.length}));

function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

app.get('/events', eventsHandler);

function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

async function addFact(request, response, next) {
    const newFact = request.body;
    facts.push(newFact);
    response.json(newFact)
    return sendEventsToAll(newFact);
}

/**
 * @swagger
 *
 * /fact:
 *    post:
 *        description: send data to server
 *        parameters:
 *            - test: object
 */
app.post('/fact', addFact);

/**
 * @swagger
 *
 * /convertor:
 *    post:
 *        description: convert a number (min: 0, max: 100) into roman numerals
 *        parameters:
 *            - data: object
 */
app.post('/convertor', convertor);

let clients = [];
let facts = [];


app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
})




