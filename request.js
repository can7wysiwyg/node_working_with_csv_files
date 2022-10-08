const axios = require("axios");

axios.get("http://www.google.com").then((reponse) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
})
