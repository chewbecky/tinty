function generateSteps(colorValue) {
    var baseRelLuminance = Math.round(calcRelativeLuminance(colorValue) * 10);
    console.log(baseRelLuminance);
    return baseRelLuminance;
}

function initializeColors(baseColor) {
    colorBox.innerHTML = "";
    var colorField = document.createElement("div");
    colorField.className = "colorField";
    colorField.style.backgroundColor = baseColor;
    colorField.innerHTML = "base";

    var steps = generateSteps(colorField.style.backgroundColor);

    for (var j = 10; j > steps; j--) {
        var tint = document.createElement("div");
        tint.style.backgroundColor = calcTint(colorField.style.backgroundColor, j);
        tint.innerHTML = calcRelativeLuminance(tint.style.backgroundColor).toFixed(
            2
        );
        tint.className = "colorField";
        colorBox.appendChild(tint);
    }

    colorBox.appendChild(colorField);

    for (var i = steps; i >= 0; i-- ){
        var shade = document.createElement("div");
        shade.style.backgroundColor = calcShade(
            colorField.style.backgroundColor,
            steps, i
        );
        shade.innerHTML = calcRelativeLuminance(
            shade.style.backgroundColor
        ).toFixed(2);
        shade.className = "colorField";
        colorBox.appendChild(shade);
    }
}

function calcShade(colorValue, factor, step) {
    var tintRGB = colorValue.slice(4, -1).split(", ");
    var r = parseInt(tintRGB[0], 10);
    var g = parseInt(tintRGB[1], 10);
    var b = parseInt(tintRGB[2], 10);
    var newRGB = [0, 0, 0];

    step = step == 0 ? 0.3:step;

    newRGB[0] = Math.floor(r / factor*step);
    newRGB[1] = Math.floor(g / factor*step);
    newRGB[2] = Math.floor(b / factor*step);

    console.log(newRGB, factor);
    return "rgb(" + newRGB[0] + ", " + newRGB[1] + ", " + newRGB[2] + ")";
}

function calcTint(colorValue, factor) {
    var tintRGB = colorValue.slice(4, -1).split(", ");
    var r = parseInt(tintRGB[0], 10);
    var g = parseInt(tintRGB[1], 10);
    var b = parseInt(tintRGB[2], 10);
    var newRGB = [0, 0, 0];
    newRGB[0] = Math.floor(((255 - r) * factor) / 10 + r);
    newRGB[1] = Math.floor(((255 - g) * factor) / 10 + g);
    newRGB[2] = Math.floor(((255 - b) * factor) / 10 + b);
    return "rgb(" + newRGB[0] + ", " + newRGB[1] + ", " + newRGB[2] + ")";
}

function calcRelativeLuminance(colorValue) {
    var colorRGB = colorValue.slice(4, -1).split(", ");
    colorRGB[0] = normalizeValue(colorRGB[0]) * 0.2126;
    colorRGB[1] = normalizeValue(colorRGB[1]) * 0.7152;
    colorRGB[2] = normalizeValue(colorRGB[2]) * 0.0722;
    var luminance = colorRGB[0] + colorRGB[1] + colorRGB[2];
    return luminance;
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
