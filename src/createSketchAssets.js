import * as colorCalc from "./colorCalculations";
import sketch from "sketch";

export function createSketchAssets(selectedColor, document, title) {
  let steps = colorCalc.generateSteps(selectedColor);
  let colorPage = getOrCreatePage("Colors", document);
  let colorArtboard = new sketch.Artboard({
    name: "Colors",
    parent: colorPage
  });

  let colorGroup = new sketch.Group({
    name: "Colors",
    parent: colorArtboard
  });

  let positionX = 0;


  for (let j = 10; j > steps; j--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + j,
        frame: { x: (positionX+=120), y: 0, width: 100, height: 100 },
        style: {
          fills: [
            {
              color: colorCalc.calcTint(selectedColor, steps, j)
            }
          ]
        }
      })
    );
  }

  colorGroup.layers.push(
    new sketch.Shape({
      name: title + " Primary",
      frame: { x: (positionX+=120), y: 0, width: 100, height: 100 },
      style: {
        fills: [
          {
            color: colorCalc.colorObjectToRGBString(selectedColor)
          }
        ]
      }
    })
  );

  for (let i = steps; i >= 0; i--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + i,
        style: {
          fills: [
            {
              color: colorCalc.calcShade(selectedColor, steps, i)
            }
          ]
        },
        frame: { x: (positionX+=120), y: 0, width: 100, height: 100 }
      })
    );
  }

  colorGroup.adjustToFit();
  colorArtboard.adjustToFit();

  //addToDocumentColors(colorGroup, document);
  addToSharedStyles(colorGroup, document);

  document.selectedPage = colorPage;
}

function addToSharedStyles(group, document) {
  group.layers.map(layer => {
    document.sharedLayerStyles.push({
      name: layer.name,
      style: layer.style
    });
  });
}

function addToDocumentColors(group, document) {
  group.layers.map(layer => {
    document.colors.push({
      name: layer.name,
      style: layer.style.fills[0].color
    });
  });
}

function getOrCreatePage(pagename, document) {
  return new sketch.Page({
    name: pagename,
    parent: document
  });
}
