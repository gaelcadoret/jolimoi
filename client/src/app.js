/**
 * This script must be import with "defer" attribute !
 */

const DEBUG = true;
const API_DOMAIN_URL = "http://localhost:8080"
const convertForm = document.getElementById("convert-form");
const submitBtn = document.getElementById("submit-form-btn");
const responseDomNode = document.getElementById("response");
const responseContainer = document.getElementById("response-container");

const NODE_LI = "li";
const numbersDomNode = document.getElementById("serverData");

const evtSource = new EventSource(`${API_DOMAIN_URL}/events`);

const log = (key, msg) => DEBUG ? console.log(key, msg): null;

log("app has been loaded.");
log("convertForm", convertForm)

/**
 * @param {string} nodeType
 * @param {number} dec - decimal number
 * @param {string} roman - roman numerals
 * @param {document} content
 */
const addElement = (nodeType, dec, roman) => {
    const element = document.createElement(nodeType);
    element.innerText = `${dec} => ${roman}`;

    return element;
}

console.log("numbersDomNode", numbersDomNode)

evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("New number received", data);

    if (Array.isArray(data)) {
        data.forEach(({decimal, roman}) => {
            if ((typeof decimal === "number") && (typeof roman === "string")) {
                const newElement = addElement(NODE_LI, decimal, roman);
                numbersDomNode.appendChild(newElement);
            }
        });
    } else {
        const { decimal, roman } = data;

        if ((typeof decimal === "number") && (typeof roman === "string")) {
            const newElement = addElement(NODE_LI, decimal, roman);
            numbersDomNode.appendChild(newElement);
        }
    }
}

const request = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

const convert = async (num) => {
    return await request(`${API_DOMAIN_URL}/convertor`, {
        data: num,
    });
};

const showResponse = (txt) => {
    responseDomNode.innerText = txt;
    responseContainer.classList.remove("hidden");
};

const handleClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    const num = convertForm.userEntry.value;

    log("click event has been triggered!")
    log("num", num)

    convert(num)
        .then((res) => {
            log("res", res);

            showResponse(res.data || res.error);
        });
};

submitBtn.addEventListener("click", handleClick);
