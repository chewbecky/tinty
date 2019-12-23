function generateSteps(colorValue) {
    let baseRelLuminance = Math.round(calcRelativeLuminance(colorValue) * 10);
    console.log(baseRelLuminance);
    return baseRelLuminance;
}


export function calcShade(colorValue, factor, step) {

    let newRGB = {};

    newRGB.r = Math.floor(colorValue.r / factor*step);
    newRGB.g = Math.floor(colorValue.g / factor*step);
    newRGB.b = Math.floor(colorValue.b / factor*step);

    return newRGB;
}

export function calcTint(colorValue, factor) {

    let newRGB = {};

    newRGB.r = Math.floor(((255 - colorValue.r) * factor) / 10 + colorValue.r);
    newRGB.g = Math.floor(((255 - colorValue.g) * factor) / 10 + colorValue.g);
    newRGB.b = Math.floor(((255 - colorValue.b) * factor) / 10 + colorValue.b);
    return "rgb(" + newRGB[0] + ", " + newRGB[1] + ", " + newRGB[2] + ")";
}

function calcRelativeLuminance(colorValue) {
    colorValue.r = normalizeValue(colorValue.r) * 0.2126;
    colorValue.g = normalizeValue(colorValue.g) * 0.7152;
    colorValue.b = normalizeValue(colorValue.b) * 0.0722;

    return colorValue.r + colorValue.g + colorValue.b;
}

function normalizeValue(singleColorValue) {
    singleColorValue = singleColorValue / 255;
    if (singleColorValue <= 0.03928) {
        console.log("value is darker")
        singleColorValue = 0.03928 / 12.92;
    } else {
        console.log("value is brighter")
        singleColorValue = ((singleColorValue + 0.055) / 1.055) ** 2.4;
    }
    return singleColorValue;
}
