export function generateSteps(colorValue) {
  return Math.round(calcRelativeLuminance(colorValue) * 10);
}

export function calcTintsAndShades(colorValue, steps, step, isTint) {
  let newShade = {};
  let factor = step === 0 ? 0.1 : step === steps ? 0.9 : step/steps;

  newShade.r = isTint
    ? calcSingleTintValue(colorValue.r, factor)
    : calcSingleShadeValue(colorValue.r, factor);
  newShade.g = isTint
    ? calcSingleTintValue(colorValue.g, factor)
    : calcSingleShadeValue(colorValue.g, factor);
  newShade.b = isTint
    ? calcSingleTintValue(colorValue.b, factor)
    : calcSingleShadeValue(colorValue.b, factor);

  console.log(steps, step, factor, isTint, newShade);

  return colorObjectToRGBString(newShade);
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

function calcSingleTintValue(singeColorValue, factor) {
  return Math.floor(
    (255 - singeColorValue) *factor + singeColorValue
  );
}

function calcSingleShadeValue(singleColorValue, factor) {
  return Math.floor(singleColorValue * factor);
}
