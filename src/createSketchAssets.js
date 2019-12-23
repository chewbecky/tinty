import * as colorCalc from "./colorCalculations";
import sketch from "sketch";
import { colorObjectToRGBString } from "./colorCalculations";
import { calcTint } from "./colorCalculations";

function createDocumentColors(selectedColor, document, title) {
  let steps = colorCalc.generateSteps(selectedColor);
  let colorGroup = new sketch.Group();

  for (let j = 10; j > steps; j--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + j,
        style: {
          fills: [
            {
              color: colorCalc.colorObjectToRGBString(
                colorCalc.calcTint(selectedColor, steps, j)
              )
            }
          ]
        }
      })
    );
  }

  colorGroup.layers.push(
    new sketch.Shape({
      name: title + " Primary",
      style: {
        fills: [
          {
            color: selectedColor
          }
        ]
      }
    })
  );

  for (let i = steps; i >= 0; i--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + j,
        style: {
          fills: [
            {
              color: colorCalc.colorObjectToRGBString(
                colorCalc.calcShades(selectedColor, steps, j)
              )
            }
          ]
        }
      })
    );
  }

  addToDocumentColors(colorGroup, document);
  addToSharedStyles(colorGroup,document);
}

function addToSharedStyles(group, document) {
  group.layers.map(layer => {
    document.sharedLayerStyles.push({
      name: layer.name,
      style: layer.style
    });
  });
}

function addToDocumentColors(group,document) {
    group.layers.map(layer => {
        document.colors.push({
            name: layer.name,
            style: layer.style.fills[0].color
        });
    });
}
