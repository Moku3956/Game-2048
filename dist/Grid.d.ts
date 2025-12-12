type Matrix = number[][];
export declare class Grid {
    matrix4: Matrix;
    constructor();
    private readonly transpose;
    mergeSameNumsRight(numList: number[]): void;
    mergeSameNumsLeft(numList: number[]): void;
    private processRow;
    moveTile(direction: string): void;
    private isGameOver;
    addRandomTile(): Matrix;
    private showGameOverOptions;
    render(): void;
    resetGame(): void;
    renderTileLogic(row: number, col: number, matrix: number[][], container: Element): void;
}
export {};
//# sourceMappingURL=Grid.d.ts.map