export function reformatNominal(nominal) {
    nominal = parseInt(nominal)
    let nominalString = nominal.toString();
    let sisa;
    let reformattedNumber = "";
    let isWholeNumber = Number.isInteger(nominal);
    let reformattedNominal = "";
    console.log(isWholeNumber)
    console.log(nominal)

    let indexOfPoint;
    let floatWithoutDecimalString = "";

    if (isWholeNumber) {
        sisa = nominalString.length % 3;
        if (sisa != 0) {
            reformattedNumber = nominalString.slice(0, sisa) + ".";
        }
        for (let start=sisa, end=sisa+3; end < nominalString.length; start+=3, end+=3) {
            reformattedNumber += nominalString.slice(start, end) + ".";
        }
        reformattedNumber += nominalString.slice(-3);
        reformattedNominal = "Rp" + reformattedNumber + ",00";
    } else {
        console.log("masuk ke else")
        console.log(isWholeNumber)
        console.log(nominal)
        indexOfPoint = nominalString.indexOf(".")
        floatWithoutDecimalString = nominalString.slice(0, indexOfPoint);
        sisa = floatWithoutDecimalString.length % 3;
        if (sisa != 0) {
            reformattedNumber = floatWithoutDecimalString.slice(0, sisa) + ".";
        }
        for (let start=sisa, end=sisa+3; end < floatWithoutDecimalString.length; start+=3, end+=3) {
            reformattedNumber += floatWithoutDecimalString.slice(start, end) + ".";
        }
        reformattedNumber += floatWithoutDecimalString.slice(-3);
        reformattedNumber += ",";
        reformattedNumber += nominalString.slice(indexOfPoint + 1);
        reformattedNominal = "Rp" + reformattedNumber;
    }
    console.log(reformattedNominal)
    return reformattedNominal;
}

export function reformatDate(tanggal) {
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const date = new Date(tanggal);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const reformattedDate = day + " " + month + " " + year;
    return reformattedDate;
}