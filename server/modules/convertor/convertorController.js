const { successResponse, errorResponse} = require("../common");
const convertDecToRoman = require("./convertDecToRoman");

let clients = [];
let facts = [];

/**
 * Use by clients to be register on the server
 * @param request
 * @param response
 * @param next
 */
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

function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

/**
 * Push data in array to simulate database.
 * @param {object} data
 */
function recordConversion(data) {
    facts.push(data);
    console.log("facts", facts);
}

async function sendEvents(data) {
    return sendEventsToAll(data);
}

const convertorController = (req, res) => {
   try {
       const { data } = req.body;
       console.log("body", data);

       if (Number(data) === 0) {
           return res.status(200).json(
               successResponse("0")
           );
       }

       if (data < 0 || data > 100) throw new Error("Numeric value must be part of range 0 to 100");

       const romanNumeral = convertDecToRoman(data);

       const conversionData = {
           decimal: Number(data),
           roman: romanNumeral,
       };

       recordConversion(conversionData);
       sendEvents(conversionData)
           .then(() => {
               console.log("Data has been sent to clients!");
           });

       return res.status(200).json(
           successResponse("Decimal number has been converted successfully!")
       );
   } catch (e) {
       return res.status(400).json(
           errorResponse(e.message)
       );
   }
};

module.exports = {
    convertorController,
    eventsHandler,
};
