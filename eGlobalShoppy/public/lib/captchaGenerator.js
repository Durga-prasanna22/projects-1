function getRandomLowerCaseChar() {
    // 97- 122
    var minRange = 97;
    var maxRange = 122;
    var randomAscii = Math.floor(Math.random() * (maxRange - minRange) + minRange);
    var randomChar = String.fromCharCode(randomAscii)
    return randomChar;
}

function getRandomUpperCaseChar() {
    // 65 - 90
    var minRange = 65;
    var maxRange = 90;
    var randomAscii = Math.floor(Math.random() * (maxRange - minRange) + minRange);
    var randomUpperCaseChar = String.fromCharCode(randomAscii)
    return randomUpperCaseChar;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

var getCapthcaaText = (format) => {
    if (!format) {
            format = 'ULNNL';
    }
    var capthcaText = '';
    for (var i = 0 ;  i < format.length; i++) {
        
        switch(format[i]) {
            case 'U':
                capthcaText += getRandomUpperCaseChar();
                break;
            case 'L':
                capthcaText += getRandomLowerCaseChar();
                break;
            case 'N':
                capthcaText += getRandomNumber();
                break;
        }        
    }
    return capthcaText;
}
