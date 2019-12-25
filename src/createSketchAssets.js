import * as colorCalc from "./colorCalculations";
import sketch from "sketch";

export function createSketchAssets(selectedColor, document, title) {
  let steps = colorCalc.generateSteps(selectedColor);
  let colorPage = getOrCreatePage("Colors", document);
  let colorArtboard = new sketch.Artboard({
    name: title,
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
        frame: { x: (positionX += 120), y: 0, width: 100, height: 100 },
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
      frame: { x: (positionX += 120), y: 0, width: 100, height: 100 },
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
        frame: { x: (positionX += 120), y: 0, width: 100, height: 100 }
      })
    );
  }

  colorGroup.adjustToFit();
  colorArtboard.adjustToFit();

  if (
    colorPage.layers.filter(layer => {
      return layer.name === title;
    }).length === 1
  ) {
    addToDocumentColors(colorGroup, document);
    addToSharedStyles(colorGroup, document);
  } else {
    overrideDocumentColors(colorGroup, document, title);
    overrideSharedStyles(colorGroup, document, title);
  }

  document.selectedPage = colorPage;
}

function addToSharedStyles(group, document) {
  group.layers.map(layer => {
    layer.sharedStyle = sketch.SharedStyle.fromStyle({
      name: layer.name,
      style: layer.style,
      document: document
    });
  });
}

function addToDocumentColors(group, document) {
  group.layers.map(layer => {
    document.colors.push({
      name: layer.name,
      color: layer.style.fills[0].color
    });
  });
}

function getOrCreatePage(pagename, document) {
  let page = sketch.find('Page, [name="Colors"]');
  if (page.length === 0) {
    return new sketch.Page({
      name: pagename,
      parent: document
    });
  } else {
    return page[0];
  }
}

function overrideDocumentColors(group, document, title) {
  document.colors = document.colors.filter(colorAsset => {return !colorAsset.name.includes(title)});
  addToDocumentColors(group, document);
}

function overrideSharedStyles(group, document, title) {
  document.sharedLayerStyles.map(sharedLayerStyle => {
    if (sharedLayerStyle.name.includes(title)) {
      console.log(sharedLayerStyle);
      let layer = sketch.find('[name="'+ sharedLayerStyle.name + '"]', group);
      console.log(layer);
      sharedLayerStyle.style = layer.style;
      layer.sharedStyle = sharedLayerStyle;
      console.log(sharedLayerStyle);
      console.log(layer);
    }
  });
}
