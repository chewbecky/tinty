import * as colorCalc from "./colorCalculations";
import sketch from "sketch";

export function createSketchAssets(selectedColor, document, title) {
  const numOfNuances = 6;
  const nuanceOfPrimary = colorCalc.generateSteps(selectedColor, numOfNuances);
  const numOfTints = numOfNuances - nuanceOfPrimary;
  const numOfShades = nuanceOfPrimary + 1;
  console.log(title, numOfNuances, nuanceOfPrimary, numOfTints, numOfShades);
  let positionX = 0;
  let nuanceNamingCounter = 1;
  let colorPage = getOrCreatePage("Colors", document);
  let colorArtboard = new sketch.Artboard({
    name: title,
    parent: colorPage,
    frame: { x: 0, y: colorPage.layers.length * 200, width: 0, height: 0 }
  });

  let colorGroup = new sketch.Group({
    name: "Colors",
    parent: colorArtboard
  });

  colorGroup.layers.push(
    new sketch.Shape({
      name: title,
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

  for (let j = numOfNuances - 1; j >= nuanceOfPrimary; j--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + nuanceNamingCounter++,
        frame: { x: (positionX += 120), y: 0, width: 100, height: 100 },
        style: {
          fills: [
            {
              color: colorCalc.calcTintsAndShades(
                selectedColor,
                numOfNuances,
                j,
                true
              )
            }
          ]
        }
      })
    );
  }
  colorGroup.layers.push(
    new sketch.Shape({
      name: title + " " + nuanceNamingCounter++,
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

  for (let i = numOfShades - 1; i >= 0; i--) {
    colorGroup.layers.push(
      new sketch.Shape({
        name: title + " " + nuanceNamingCounter++,
        style: {
          fills: [
            {
              color: colorCalc.calcTintsAndShades(
                selectedColor,
                numOfShades,
                i,
                false
              )
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
  document.colors = document.colors.filter(colorAsset => {
    return !colorAsset.name.includes(title);
  });
  addToDocumentColors(group, document);
}

function overrideSharedStyles(group, document, title) {
  document.sharedLayerStyles.map(sharedLayerStyle => {
    if (sharedLayerStyle.name.includes(title)) {
      let layer = sketch.find(
        '[name="' + sharedLayerStyle.name + '"]',
        group
      )[0];
      sharedLayerStyle.style = layer.style;
      layer.sharedStyle = sharedLayerStyle;
      syncAllSharedStyles(sharedLayerStyle);
    }
  });
}

function syncAllSharedStyles(sharedStyle) {
  let styleInstances = sharedStyle.getAllInstances();
  styleInstances.map(style => {
    style.syncWithSharedStyle(sharedStyle);
  });
}
