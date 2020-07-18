const InLocation = require("./india-location-details");

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

InLocation.fetchStateData((offset = 0),(limit = 10),"maharashtra",(requiredFields = ["divisionname", "regionname", "pincode"]),(api_key = "[YOUR_API_KEY]"))
  .then((result) => {
    if (result.error) {
      console.log(result.error);
    }
    console.log(result.data);
  })
  .catch((error) => {
    console.log(error);
  });

InLocation.fetchRegionData(
  (offset = 0),
  (limit = 10),
  "mumbai",
  (requiredFields = Fields),
  (api_key = "[YOUR_API_KEY]")
)
  .then((result) => {
    if (result.error) {
      console.log(result.error);
    }
    console.log(result.data);
  })
  .catch((error) => {
    console.log(error);
  });

InLocation.fetchPincodeData(
  (offset = 0),
  (limit = 10),
  401101,
  (requiredFields = ["divisionname", "regionname", "pincode"]),
  (api_key = "[YOUR_API_KEY]")
)
  .then((result) => {
    if (result.error) {
      console.log(result.error);
    }
    console.log(result.data);

})
.catch((error) => {
    console.log(error)
})
