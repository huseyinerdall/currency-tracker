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
  let f,s = 0;
  let first,second = null;
  let balance,diger = 0;
  for (const w in wallet) {

    if(parseFloat(wallet[w]["amount"])){
      let temp = parseFloat(allPrices[wallet[w]["shortName"]])*parseFloat(wallet[w]["amount"]);
      balance += temp;
      if(f<temp){
        s = f;
        second = first;
        first = wallet[w];
        f = temp;
      }
      diger = balance - (f+s);

    }

  }
  return {
    first,second,"diger":diger
  };
}

module.exports = { search, setGraph };
