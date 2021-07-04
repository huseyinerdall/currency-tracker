function capitalize(str) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// search in array of objects a specific value key
function search(nameKey, array) {
  let res;
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === nameKey) {
      res = array[i];
    }
  }
  if (res) {
    return res;
  }
  nameKey = capitalize(nameKey);
  for (i = 0; i < array.length; i++) {
    if (array[i].name === nameKey) {
      res = array[i];
    }
  }
  return res;
}

function setGraph(wallet,allPrices){
  let f,s,temp;
  f = 0;
  s = 0;
  let result = {};
  let first,second  = '';
  let balance,diger;
  balance = 0;
  diger = 0;
  for (const w in wallet) {
    if(parseFloat(wallet[w]["amount"])>0){

      temp = parseFloat(allPrices[wallet[w]["shortName"]])*parseFloat(wallet[w]["amount"]);
      balance += temp;

      if(parseFloat(f)<temp){
        if(f>10000){
          s = f;
          second = first;
        }
        f = temp;
        first = wallet[w]["shortName"];

      }

    }

  }
  diger = balance - (f+s);
  result[first] = f;
  result[second] = s;
  result["diger"] = diger;
  result["total"] = balance;
  return result;
}

module.exports = { search, setGraph };
