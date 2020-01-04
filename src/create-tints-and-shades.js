import BrowserWindow from "sketch-module-web-view";

export default function() {
  const options = {
    identifier: "unique.id"
  };

  const browserWindow = new BrowserWindow({ width: 800, height: 600, frame: false });

  browserWindow.loadURL(require("../resources/create-tints-and-shades.html"));
}
