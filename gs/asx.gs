/* https://github.com/billsegall/oz-sheets */

// Return the value of the attribute for the instrument from the ASX website
function ASX_test(instrument, attribute) {
  // For testing
  if (instrument == null) {
    instrument = "CBA.AX";
  }
  if (attribute == null) {
    attribute = "currentPrice";
  }
  var json = ASX_json(instrument);
  var val = json[attribute];
  return json[attribute];
}

// Returns all attribute/values as a 2d (vertical) array
// Use transpose(ASX_all(instrument) if you want it horizontal
// You can also directly access a field you want, e.g.
// '=index(ASX_all("BHP"), 12, 2)' will get you the eps
// Note that the asx are free to change the supported attributes and this might change
function ASX_all(instrument) {
  return json2array(ASX_json(instrument));
}

// Convert a json object to a sorted array
function json2array(json, kv = [], s = "") {
  for (k of Object.keys(json).sort()) {
    if (typeof json[k] !== 'object' || json[k] == null) {
      if (s.length === 0) {
         kv.push([k, json[k]]);
      } else {
         kv.push([s + "." + k, json[k]]);
      }
    } else {
      if (s.length === 0) {
        json2array(json[k], kv, k)
      } else {
      json2array(json[k], kv, s + "." + k);
      }
    }
  }
  return kv;
}

// Return the value of the attribute for the instrument from the ASX website
function ASX_price(instrument) {
   var json = ASX_json(instrument);
  return json["currentPrice"];
}

// Fetch the json from our yahoo finance service
function ASX_json(instrument) {
  url = "http://mockingbirdinvestment.com:8000/yf/" + instrument;
  var response = UrlFetchApp.fetch(url);
  if (response == null) {
    Logger.log("No response");
    return "No response"
  } else {
    var content = response.getContentText();
    Logger.log(content);
    return json = JSON.parse(content);
  }
}

// Helper for url fetch options
function options() {
  return {
    method: "get",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  };
}



