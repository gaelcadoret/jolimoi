/**
 * This script must be import with "defer" attribute !
 */

const DEBUG = true;
const API_DOMAIN_URL = "http://localhost:3000"
const convertForm = document.getElementById("convert-form");
const submitBtn = document.getElementById("submit-form-btn");

const log = (msg) => DEBUG ? console.log(msg): null;

log("app has been loaded.");
log("convertForm", convertForm)

const request = async (url, data) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

const convert = (num) => {
    return request(`${API_DOMAIN_URL}/convertor`, {
        data: num,
    });
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
        });
};

submitBtn.addEventListener("click", handleClick);
