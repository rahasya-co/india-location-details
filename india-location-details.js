const getApi = require("./api");
const pick = require("lodash.pick");

var Fields = [
  "officename",
  "pincode",
  "officetype",
  "deliverystatus",
  "divisionname",
  "regionname",
  "circlename",
  "taluk",
  "districtname",
  "statename",
  "telephone",
  "related_suboffice",
  "related_headoffice",
  "longitude",
  "latitude",
];

/* start of helper functions */

function checkRequired(requiredFields) {
  let setIfNegative = false;

  requiredFields.forEach((element) => {
    if (Fields.indexOf(element) == -1) {
      setIfNegative = true;
    }
  });

  return setIfNegative;
}

function processData(results, requiredFields) {
  let dataDictionary = {};

  dataDictionary["total"] = results.total;
  dataDictionary["limit"] = parseInt(results.limit);
  dataDictionary["count"] = results.count;
  dataDictionary["currentOffset"] = parseInt(results.offset);
  dataDictionary["nextOffset"] =
    parseInt(results.offset) + parseInt(results.count);

  const dataArray = [];

  results.records.forEach((element) => {
    dataArray.push(pick(element, requiredFields));
  });

  dataDictionary["records"] = dataArray;

  return dataDictionary;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/* End of helper functions */

// api to fetch state data
exports.fetchStateData = async (
  offset = 0,
  limit = 10,
  stateName,
  requiredFields = Fields,
  api_key
) => {
  let response_object = {};

  if (api_key) {
    const statename = stateName.toUpperCase();

    const requiredError = checkRequired(requiredFields);
    if (requiredError) {
      response_object["error"] =
        "Required Field has some element which doesn't match the feild values given.";
      return response_object;
    }

    try {
      let apiResponse = await getApi.apiData(
        offset,
        limit,
        "statename",
        statename,
        api_key
      );

      let proccessedData = processData(apiResponse, requiredFields);

      response_object["data"] = proccessedData;

      return response_object;
    } catch (error) {
      console.log(error);

      response_object["error"] = error;

      return response_object;
    }
  } else {
    response_object["error"] = "Api Key Missing";
    return response_object;
  }
};
//api to fetch pincode data

// pincode
// a.fetchPincodeData(10,10,401101,["pincode","statename"]).then((result) => {console.log(result.data)} ).catch((error) => { console.log(error)})

exports.fetchPincodeData = async (
  offset = 0,
  limit = 10,
  pincode,
  requiredFields = Fields,
  api_key
) => {
  let response_object = {};

  if (api_key) {
    const pincodeInt = parseInt(pincode);

    const requiredError = checkRequired(requiredFields);
    if (requiredError) {
      response_object["error"] =
        "Required Field has some element which doesn't match the feild values given.";
      return response_object;
    }

    if (pincodeInt.toString().length != 6) {
      response_object["error"] = { message: "Pincode length invalid" };

      return response_object;
    }
    try {
      let apiResponse = await getApi.apiData(
        offset,
        limit,
        "pincode",
        pincode,
        api_key
      );

      let proccessedData = processData(apiResponse, requiredFields);

      response_object["data"] = proccessedData;

      return response_object;
    } catch (error) {
      console.log(error);

      response_object["error"] = { message: error };

      return response_object;
    }
  } else {
    response_object["error"] = "Api Key Missing";
    return response_object;
  }
};

//api to fetch region data
// region
// a.fetchRegionData(0,10,"Pune",["pincode","statename"]).then((result) => {console.log(result.data)} ).catch((error) => { console.log(error)})

exports.fetchRegionData = async (
  offset = 0,
  limit = 10,
  region,
  requiredFields = Fields,
  api_key
) => {
  let response_object = {};

  if (api_key) {
    const regionToApi = toTitleCase(region);

    const requiredError = checkRequired(requiredFields);
    if (requiredError) {
      response_object["error"] =
        "Required Field has some element which doesn't match the feild values given.";
      return response_object;
    }

    try {
      let apiResponse = await getApi.apiData(
        offset,
        limit,
        "regionname",
        regionToApi,
        api_key
      );

      let proccessedData = processData(apiResponse, requiredFields);

      response_object["data"] = proccessedData;

      return response_object;
    } catch (error) {
      console.log(error);

      response_object["error"] = { message: error };

      return response_object;
    }
  } else {
    response_object["error"] = "Api Key Missing";
    return response_object;
  }
};
