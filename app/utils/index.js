function capitalize(str) {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
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
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            res = array[i];
        }
    }
    return res;
}

// this function convert string which contains turkish char to english string
// also remove spaces in the string  REŞİT ALTIN --> RESITALTIN
function turkishToEnglish(str) {
    let temp = str
        .replace(/Ğ/g, "G")
        .replace(/Ü/g, "U")
        .replace(/Ş/g, "S")
        .replace(/I/g, "I")
        .replace(/İ/g, "I")
        .replace(/Ö/g, "O")
        .replace(/Ç/g, "C")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/\s/g, ''); // \s -> space
    return temp;
}


module.exports = { search, turkishToEnglish };