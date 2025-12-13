import { Grid } from "./Grid";
import { InputManager } from "./InputManager";

const grid = new Grid();
grid.addRandomTile();
grid.render();
const inputManager = new InputManager();
inputManager.setup();

inputManager.onCall = (direction: string) => {
  if (grid.moveTile(direction)) {
    // renderメソッドとaddRandomTileメソッドの実行する順番を変えるな
    grid.addRandomTile();
    grid.render();
  }
};
