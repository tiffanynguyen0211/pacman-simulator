import { Grid } from './types';

const unit = 50;
const spacing = 5;
const rows = 5;
const cols = 5;

const isWithinGrid = (rowIndex: number, colIndex: number): boolean => {
    return (
        colIndex >= 0 &&
        colIndex <= cols - 1 &&
        rowIndex >= 0 &&
        rowIndex <= rows - 1
    );
};

const gridHeight = cols * (unit + 2 * spacing);
const gridWidth = rows * (unit + 2 * spacing);

const initGrid = (): Grid => {
    const grid = [];
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            grid.push({
                row,
                col,
            });
        }
    }

    return {
        rows,
        cols,
        grid: grid.reverse(),
        width: gridWidth,
        height: gridHeight,
        unit,
        spacing,
    };
};

export { initGrid, isWithinGrid };
