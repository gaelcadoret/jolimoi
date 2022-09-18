const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { convertorController, eventsHandler } = require("./modules/convertor");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/events', eventsHandler);



/**
 * @swagger
 *
 * /convertor:
 *   post:
 *     description: convert a number into roman numerals
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: body
 *        description: Decimal number to be converted.
 *        in: body
 *        required: true
 *        type: object
 *        schema:
 *          properties:
 *            data:
 *              type: string
 *     responses:
 *       200:
 *         description: return message ok
 *         schema:
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: string
 *             timestamp:
 *               type: timestamp
 *       400:
 *         description: bad request
 */
app.post('/convertor', convertorController);

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
})




