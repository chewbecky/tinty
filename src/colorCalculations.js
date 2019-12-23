export function generateSteps(colorValue) {
  let baseRelLuminance = Math.round(calcRelativeLuminance(colorValue) * 10);
  console.log(baseRelLuminance);
  return baseRelLuminance;
}

export function calcShade(colorValue, factor, step) {
  let newRGB = {};

  newRGB.r = Math.floor((colorValue.r / factor) * step);
  newRGB.g = Math.floor((colorValue.g / factor) * step);
  newRGB.b = Math.floor((colorValue.b / factor) * step);

  return newRGB;
}

export function calcTint(colorValue, factor, step) {
  let newRGB = {};

  newRGB.r = Math.floor(((255 - colorValue.r) * factor) / step + colorValue.r);
  newRGB.g = Math.floor(((255 - colorValue.g) * factor) / step + colorValue.g);
  newRGB.b = Math.floor(((255 - colorValue.b) * factor) / step + colorValue.b);
  return newRGB;
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

  colorObject.r = parseInt(sketchHex.slice(1,2), "16");
  colorObject.g = parseInt(sketchHex.slice(3,4), "16");
  colorObject.b = parseInt(sketchHex.slice(5,6), "16");

}

export function colorObjectToSketchHex(colorObject) {
  return (
    "#" +
    colorObject.r.toString(16) +
    colorObject.r.toString(16) +
    colorObject.b.toString(16)
  );
}
