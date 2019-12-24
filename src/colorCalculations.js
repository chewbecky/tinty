export function generateSteps(colorValue) {
  let baseRelLuminance = Math.round(calcRelativeLuminance(colorValue) * 10);
  return baseRelLuminance;
}

export function calcShade(colorValue, factor, step) {
  let newShade = {};

  newShade.r = Math.floor(colorValue.r * (step / factor));
  newShade.g = Math.floor(colorValue.g * (step / factor));
  newShade.b = Math.floor(colorValue.b * (step / factor));

  return colorObjectToRGBString(newShade);
}

export function calcTint(colorValue, factor, step) {
  let newTint = {};

  newTint.r = Math.floor(((255 - colorValue.r) * factor) / step + colorValue.r);
  newTint.g = Math.floor(((255 - colorValue.g) * factor) / step + colorValue.g);
  newTint.b = Math.floor(((255 - colorValue.b) * factor) / step + colorValue.b);

  return colorObjectToRGBString(newTint);
}

function calcRelativeLuminance(colorValue) {
  let luminanceRGB = {};

  luminanceRGB.r = normalizeValue(colorValue.r) * 0.2126;
  luminanceRGB.g = normalizeValue(colorValue.g) * 0.7152;
  luminanceRGB.b = normalizeValue(colorValue.b) * 0.0722;


  return luminanceRGB.r + luminanceRGB.g + luminanceRGB.b;
}

function normalizeValue(singleColorValue) {
  singleColorValue = singleColorValue / 255;
  if (singleColorValue <= 0.03928) {
    singleColorValue = 0.03928 / 12.92;
  } else {
    singleColorValue = ((singleColorValue + 0.055) / 1.055) ** 2.4;
  }
  return singleColorValue;
}

export function colorObjectToRGBString(colorObject) {
  return (
    "rgb(" + colorObject.r + ", " + colorObject.g + ", " + colorObject.b + ")"
  );
}

export function sketchHexToColorObject(sketchHex) {
  let colorObject = {};

  colorObject.r = parseInt(sketchHex.slice(1, 3), "16");
  colorObject.g = parseInt(sketchHex.slice(3, 5), "16");
  colorObject.b = parseInt(sketchHex.slice(5, 7), "16");

  console.log(sketchHex);
  console.log(colorObject);
  return colorObject;
}

export function colorObjectToSketchHex(colorObject) {
  return (
    "#" +
    colorObject.r.toString(16) +
    colorObject.r.toString(16) +
    colorObject.b.toString(16) +
    "ff"
  );
}
