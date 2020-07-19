# india-location-details
india-location-details package is to get details about Indian locations based on pincode, state name or city name.

## Supported Fields

1. Pincode
2. RegionName
3. Taluk
4. DivisionName
5. DistrictName
6. StateName
7. CircleName
8. OfficeName
9. OfficeType
10. DeliveryStatus
11. Telephone
12. Related_suboffice
13. Related_headoffice
14. Longitude
15. Latitude

## Parameters

1. offset [DEFAULT=0]
2. limit [DEFAULT=100]
3. Filter, should be one of the below as per the need
   - StateName
   - pincode
   - regionName
4. requiredFields [DEFAULT= all 15 supporting fields]

## Usage

### Installation
```
npm i india-location-details
```

### Generate API key

```
1. Register yourself on https://data.gov.in/
2. Log in and go to My Profile, you would find generate API key option besides API KEY title.
```

### import package

```javascript
const InLocation = require("india-location-details");
```

### Fetch state data

```javascript
InLocation.fetchStateData(offset, limit, stateName, requiredFields, "YOUR_API_KEY").then((result) =>{
    ...
})
.catch((error) => {
    console.log(error);
    ...
})
```

### Fetch pincode data

```javascript
InLocation.fetchPincodeData(offset, limit, pincode, requiredFields, "YOUR_API_KEY").then((result) =>{
    console.log(result.data);
    ...
})
.catch((error) => {
    console.log(error);
    ...
})
```

### Fetch region data

```javascript
InLocation.fetchPincodeData(offset, limit, regionName, requiredFields, "YOUR_API_KEY").then((result) =>{
    console.log(result.data);
    ...
})
.catch((error) => {
    console.log(error);
    ...
})
```

### Examples

```javascript
const InLocation = require("india-location-details");

InLocation.fetchStateData(
  (offset = 0),
  (limit = 10),
  "maharashtra",
  (requiredFields = ["divisionname", "regionname", "pincode"]),
  "YOUR_API_KEY"
)
  .then((result) => {
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
  "YOUR_API_KEY"
)
  .then((result) => {
    console.log(result.data);
  })
  .catch((error) => {
    console.log(error);
  });

InLocation.fetchRegionData(
  (offset = 0),
  (limit = 10),
  "mumbai",
  (requiredFields = ["divisionname", "regionname", "pincode"]),
  "YOUR_API_KEY"
)
  .then((result) => {
    console.log(result.data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Output format

```JSON
{
  "total": "Total number of records.",
  "limit": "Size of the data/ no. of records",
  "count": "Number of records returned",
  "currentOffset": "Current offset",
  "nextOffset": "Next offset, in case more data is needed",
  "records": "List of records returned"
}
```

Example:

This example demonstrate data fetched for mumbai region with default requiredFields.

```javascript
InLocation.fetchRegionData(0, 2, "mumbai", requiredFields, "YOUR_API_KEY").then((result) =>{
    console.log(result.data)
})
.catch((error) => {
    console.log(error)
})

returns:

{
  "total": 1123,
  "limit": '2',
  "count": 2,
  "currentOffset": undefined,
  "nextOffset": 2,
  "records": [
    {
      "officename": 'Antop Hill S.O',
      "pincode": '400037',
      "officetype": 'S.O',
      "deliverystatus": 'Delivery',
      "divisionname": 'Mumbai  East',
      "regionname": 'Mumbai',
      "circlename": 'Maharashtra',
      "taluk": 'Mumbai',
      "districtname": 'Mumbai',
      "statename": 'MAHARASHTRA',
      "telephone": '022-24120290',
      "related_suboffice": 'NA',
      "related_headoffice": 'Dadar H.O',
      "longitude": 'NA',
      "latitude": 'NA'
    },
    {
      "officename": 'B P T Colony S.O',
      "pincode": '400037',
      "officetype": 'S.O',
      "deliverystatus": 'Non-Delivery',
      "divisionname": 'Mumbai  East',
      "regionname": 'Mumbai',
      "circlename": 'Maharashtra',
      "taluk": 'Mumbai',
      "districtname": 'Mumbai',
      "statename": 'MAHARASHTRA',
      "telephone": '022-4100525',
      "related_suboffice": 'NA',
      "related_headoffice": 'Dadar H.O',
      "longitude": 'NA',
      "latitude": 'NA'
    }
  ]
}

.
```
