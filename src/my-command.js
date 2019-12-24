import sketch from "sketch";
import { createSketchAssets } from "./createSketchAssets";
import * as colorCalc from "./colorCalculations";
// documentation: https://developer.sketchapp.com/reference/api/

const document = sketch.getSelectedDocument();
let selectedColor = {};

export default function(context) {
  let selection = document.selectedLayers;

  if (selection.isEmpty) {
    sketch.UI.alert(
      "No Layer Selected",
      "Please select exactly one Layer with a color fill to caluclate tints and shades of this color"
    );
  } else {
    if (selection.length > 1) {
      sketch.UI.alert(
        "More Then One Layer Selected",
        "Please select exactly one Layer with a color fill to caluclate tints and shades of this color"
      );
    } else {
      if (selection.layers[0].style){
        selectedColor = colorCalc.sketchHexToColorObject(selection.layers[0].style.fills[0].color);
        sketch.UI.getInputFromUser(
            "Please specifiy the name of your Colors",
            {
              initialValue: "Primary Color"
            },
            (err, value) => {
              if (err) {
                // most likely the user canceled the input
                return
              }
              if (value) {
                createSketchAssets(selectedColor, document, value);
              }
            }
        )
      }
    }
  }
}
