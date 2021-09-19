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

function setGraph(wallet, allPrices) {
  let result = {};
  let balance, temp;
  let f = 0;
  let s = 0;
  let fkey = "";
  let skey = "";
  temp = 0;
  balance = 0;
  for (const w in wallet) {
    if (parseFloat(wallet[w]["amount"]) > 0) {
      if (w == "TÜRK LİRASI") {
        temp =
          parseFloat(allPrices["TRY"]) * parseFloat(wallet[w]["amount"]) || 0;
      } else {
        temp = parseFloat(allPrices[w]) * parseFloat(wallet[w]["amount"]) || 0;
      }

      if (f < temp) {
        s = f;
        skey = fkey;
        f = temp;
        fkey = wallet[w]["shortName"];
      }
      balance += temp;
    }
  }
  result[fkey] = (f / balance) * 100;
  result[skey] = (s / balance) * 100;
  result["diger"] = ((balance - (f + s)) / balance) * 100;
  result["total"] = balance;
  return result;
}

function turkishPriceToEngPrice(price) {
  return price
    .replace("$", "")
    .replace(".", "")
    .replace(",", ".");
}

module.exports = { search, setGraph, turkishPriceToEngPrice };
