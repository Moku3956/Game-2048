type Matrix = number[][];
export class Grid {
  matrix4: Matrix;
  constructor() {
    this.matrix4 = [];
    for (let i = 0; i < 4; i++) {
      this.matrix4.push(new Array(4).fill(0));
    }
  }

  private readonly transpose = (matrix: Matrix): Matrix => {
    if (matrix.length === 0 || matrix[0]!.length === 0) {
      return [];
    }
    const rows = matrix.length;
    const cols = matrix[0]!.length;
    let newMatrix: Matrix = Array.from({ length: cols }, () =>
      new Array(rows).fill(0)
    );
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newMatrix[j]![i] = matrix[i]![j] ?? 0;
      }
    }
    return newMatrix;
  };

  mergeSameNumsRight(numList: number[]) {
    for (let i = numList.length - 1; i > 0; i--) {
      if (numList[i] === 0) continue;
      if (numList[i] === numList[i - 1]) {
        numList[i]! *= 2;
        numList[i - 1] = 0;
      }
    }
    let writePos = numList.length - 1;
    for (let i = numList.length - 1; i >= 0; i--) {
      if (numList[i] !== 0) {
        if (i !== writePos) {
          numList[writePos] = numList[i]!;
          numList[i] = 0;
        }
        writePos--;
      }
    }
  }

  mergeSameNumsLeft(numList: number[]) {
    for (let i = 0; i < numList.length - 1; i++) {
      if (numList[i] === 0) continue;
      if (numList[i] === numList[i + 1]) {
        numList[i]! *= 2;
        numList[i + 1] = 0;
      }
    }
    let writePos = 0;
    for (let i = 0; i < numList.length; i++) {
      if (numList[i] !== 0) {
        if (i !== writePos) {
          numList[writePos] = numList[i]!;
          numList[i] = 0;
        }
        writePos++;
      }
    }
  }

  private processRow(row: number[], direction: "left" | "right"): number[] {
    const nonZeros: number[] = [];
    const zeros: number[] = [];

    row.forEach((item) => {
      if (item === 0) {
        zeros.push(item);
      } else {
        nonZeros.push(item);
      }
    });
    const processedRow =
      direction === "left" ? nonZeros.concat(zeros) : zeros.concat(nonZeros);

    if (direction === "left") {
      this.mergeSameNumsLeft(processedRow);
    } else {
      this.mergeSameNumsRight(processedRow);
    }

    return processedRow;
  }

  moveTile(direction: string) {
    switch (direction) {
      case "right":
        this.matrix4 = this.matrix4.map((row) => this.processRow(row, "right"));
        break;

      case "left":
        this.matrix4 = this.matrix4.map((row) => this.processRow(row, "left"));
        break;

      case "up":
        let transposedMatrixUp = this.transpose(this.matrix4);
        transposedMatrixUp = transposedMatrixUp.map((row) =>
          this.processRow(row, "left")
        );
        this.matrix4 = this.transpose(transposedMatrixUp);
        break;

      case "down":
        let transposedMatrixDown = this.transpose(this.matrix4);
        transposedMatrixDown = transposedMatrixDown.map((row) =>
          this.processRow(row, "right")
        );
        this.matrix4 = this.transpose(transposedMatrixDown);
        break;
    }
  }

  private isGameOver(): boolean {
    for (let i = 0; i < this.matrix4.length; i++) {
      for (let j = 0; j < this.matrix4[i]!.length; j++) {
        if (this.matrix4[i]![j] === 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < this.matrix4.length; i++) {
      for (let j = 0; j < this.matrix4[i]!.length; j++) {
        const current = this.matrix4[i]![j];
        if (
          (i > 0 && current === this.matrix4[i - 1]![j]) || // 上
          (i < this.matrix4.length - 1 && current === this.matrix4[i + 1]![j]) || // 下
          (j > 0 && current === this.matrix4[i]![j - 1]) || // 左
          (j < this.matrix4[i]!.length - 1 && current === this.matrix4[i]![j + 1]) // 右
        ) {
          return false;
        }
      }
    }

    return true;
  }

  addRandomTile() {
    if (this.isGameOver()) {
      this.showGameOverOptions();
      return this.matrix4;
    }

    let zeroList: Matrix = [];
    for (let i = 0; i < this.matrix4.length; i++) {
      for (let j = 0; j < this.matrix4[i]!.length; j++) {
        if (this.matrix4[i]![j] === 0) {
          zeroList.push([i, j]);
        }
      }
    }

    if (zeroList.length > 0) {
      const randomNum = Math.floor(Math.random() * zeroList.length);
      this.matrix4[zeroList[randomNum]![0]!]![zeroList[randomNum]![1]!] = 2;
    }

    return this.matrix4;
  }

  private showGameOverOptions() {
    const container = document.querySelector(".grid-container")!;

    // ゲームオーバーメッセージを表示
    let gameOverContainer = document.querySelector(".game-over-container");
    if (!gameOverContainer) {
      gameOverContainer = document.createElement("div");
      gameOverContainer.className = "game-over-container";
      container.parentElement?.appendChild(gameOverContainer);
    }
    gameOverContainer.innerHTML = ""; // コンテナをクリア

    const message = document.createElement("p");
    message.textContent = "Game Over!";
    message.style.fontSize = "24px";
    message.style.color = "#776e65";
    gameOverContainer.appendChild(message);

    // Play Againボタン
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.className = "play-again-button";
    playAgainButton.onclick = () => {
      this.resetGame();
      gameOverContainer.remove();
    };
    gameOverContainer.appendChild(playAgainButton);

    // Cancelボタン
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-button";
    cancelButton.onclick = () => {
      gameOverContainer.remove();
    };
    gameOverContainer.appendChild(cancelButton);

    gameOverContainer.classList.add("game-over-container");

    playAgainButton.classList.add("play-again-button");
    cancelButton.classList.add("cancel-button");
  }

  render() {
    const container = document.querySelector(".grid-container")!;
    container.innerHTML = "";

    // タイルを描画
    for (let i = 0; i < this.matrix4.length; i++) {
      for (let j = 0; j < this.matrix4[i]!.length; j++) {
        const row = i;
        const col = j;
        this.renderTileLogic(row, col, this.matrix4, container);
      }
    }

    // Play Againボタンをグリッドの下に追加
    let buttonContainer = document.querySelector(".button-container");
    if (!buttonContainer) {
      buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
      container.parentElement?.appendChild(buttonContainer);
    }
    buttonContainer.innerHTML = ""; // ボタンコンテナをクリア

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.className = "play-again-button";
    playAgainButton.onclick = () => {
      this.resetGame();
    };
    buttonContainer.appendChild(playAgainButton);
  }

  resetGame() {
    // ゲームをリセット
    this.matrix4 = [];
    for (let i = 0; i < 4; i++) {
      this.matrix4.push(new Array(4).fill(0));
    }
    this.addRandomTile();
    this.addRandomTile();
    this.render();
  }

  renderTileLogic(
    row: number,
    col: number,
    matrix: number[][],
    container: Element
  ) {
    const newDiv = document.createElement("div");
    newDiv.className = "grid-cell";
    if (matrix[row]![col] !== 0) {
      newDiv.innerHTML = `${matrix[row]![col]}`;
      newDiv.setAttribute("data-value", `${matrix[row]![col]}`); 
    }
    container?.appendChild(newDiv);
  }
}


