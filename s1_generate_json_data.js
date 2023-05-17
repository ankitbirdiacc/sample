const XMLHttpRequest = require('xhr2');
const fs = require('fs');

const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://accenture-1.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials');
xhr.setRequestHeader('Authorization', 'Basic c2ItMTdkNTI3MjctYWE2Ny00ZDY5LWI4ODUtOWUxMGNhYzg0ZTBhIWIxMTY2NDl8Y2xpZW50IWI2NTU6NDljMjYzZjEtMzBiMi00YTM5LWI3ZjItY2VjNGRhNzI4MzE4JDh1M2F0T1JRREl0aUhCRVRUaHpZOHVmWnpJY0FhY2tyNWcxMmpUaFR0R1k9');

xhr.onload = function() {
  if (xhr.status === 200) {
    const accessToken = xhr.responseText.split('"access_token":"')[1].split('"')[0];

    xhr.open('GET', 'https://accenture-1.us10.hanacloudservices.cloud.sap/api/v1/dataexport/providers/sac/C2RSOU9C5JA89TQP26ZNEB8BNK/FactData?$count=true');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (xhr.status === 204) {
        console.log('No response body');
      } else if (xhr.status === 200) {
        const data = xhr.responseText;
        fs.writeFileSync('output.json', data);
        console.log("Data saved to json file");
      } else {
        console.log('Error: ' + xhr.status);
      }
    };

    xhr.send();
  } else {
    console.log('Error: ' + xhr.status);
  }
};

xhr.send();
