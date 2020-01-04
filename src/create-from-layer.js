import sketch from "sketch";
import { createSketchAssets } from "./createSketchAssets";
import * as colorCalc from "./colorCalculations";
// documentation: https://developer.sketchapp.com/reference/api/

const document = sketch.getSelectedDocument();
let selectedColor = {};

export default function(context) {
  let selection = document.selectedLayers;

  if (
    selection.isEmpty ||
    selection.length > 1 ||
    selection.layers[0].type === "Artboard"
  ) {
    sketch.UI.alert(
      "Layer with color fill needed",
      "Please select exactly one Layer with a color fill to caluclate tints and shades of this color"
    );
  } else if (!selection.layers[0].style.fills[0].enabled) {
    console.log("test");
    sketch.UI.alert("Color fill is inactive", "Plaese select a shape layer with an active color fill.");
  } else {
    const fill = selection.layers[0].style.fills[0];
    selectedColor = colorCalc.sketchHexToColorObject(fill.color);
    sketch.UI.getInputFromUser(
      "Please specifiy the name of your Colors",
      {
        initialValue: "Primary Color"
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
          return;
        }
        if (value) {
          createSketchAssets(selectedColor, document, value);
        }
      }
    );
  }
}
