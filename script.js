function generarEjercicio() {
    var ip =
        Math.floor(Math.random() * 255) +
        1 +
        "." +
        Math.floor(Math.random() * 255) +
        "." +
        Math.floor(Math.random() * 255) +
        "." +
        Math.floor(Math.random() * 255);
    var mask = Math.floor(Math.random() * 32);


    document.getElementById("inputIp").value = ip;
    document.getElementById("inputMask").value = mask;
    $("#resultado").hide();
}

function solucionarEjercicio() {
    var ip = document.getElementById("inputIp").value;
    var mask = document.getElementById("inputMask").value;
    var ipBinary = ipToBinary(ip);
    var maskBinary = maskToBinary(mask);
    var subredBinary = getSubRedBinary(ip, mask);
    var subredDecimal = binaryToDecimal(subredBinary);
    var maskDecimal = binaryToDecimal(maskBinary);

    document.getElementById("resultado").innerHTML = "<p>" + "IP binaria: " + "<span style='color: lime;'>" + ipBinary + "</span>" + "</p>" +
        "<p>" + "Mascara binaria: " + "<span style='color: lime;'>" + maskBinary + "</span>" + "</p>" +
        "<p>" + "Subred binaria: " + "<span style='color: lime;'>" + subredBinary + "</span>" + "</p>" +
        "<p>" + "Mascara decimal: " + "<span style='color: lime;'>" + maskDecimal + "</span>" + "</p>" +
        "<p>" + "Subred decimal: " + "<span style='color: lime;'>" + subredDecimal + "</span>" + "</p>";
    $("#resultado").show();
}

function ipToBinary(ip) {
    return ip.split('.').map(function (octet) {
        return ('00000000' + parseInt(octet, 10).toString(2)).slice(-8);
    }).join('.');
}

function maskToBinary(mask) {
    const binaryString = '1'.repeat(mask) + '0'.repeat(32 - mask);
    const octets = binaryString.match(/.{1,8}/g);
    return octets.join('.');
}

function getSubRedBinary(ip, mask) {
    const ipArray = ip.split('.').map(Number);
    const maskArray = [];
    let remainingBits = mask;

    while (remainingBits >= 8) {
        maskArray.push(255);
        remainingBits -= 8;
    }

    if (remainingBits > 0) {
        const lastByte = 256 - Math.pow(2, 8 - remainingBits);
        maskArray.push(lastByte);
    }

    while (maskArray.length < 4) {
        maskArray.push(0);
    }

    const subredArray = ipArray.map((octet, index) => octet & maskArray[index]);
    return subredArray.map(octet => ('00000000' + octet.toString(2)).slice(-8)).join('.');
}

function binaryToDecimal(binary) {
    const octets = binary.split('.').map(octet => parseInt(octet, 2));
    return octets.join('.');
}