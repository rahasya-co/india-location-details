const axios = require("axios");

exports.apiData = (offset = 0, limit = 100, filter, filterValue, api_key) => {
  let url = `https://api.data.gov.in/resource/04cbe4b1-2f2b-4c39-a1d5-1c2e28bc0e32?api-key=${api_key}&format=json&offset=${offset}&limit=${limit}&filters[${filter}]=${filterValue}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((responseJson) => {
        if (responseJson.status == 200) {
          return resolve(responseJson.data);
        } else {
          return reject(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);

        return reject(error);
      });
  });
};
