export type Direction = 'west' | 'south' | 'east' | 'north';

export type PacManPosition = {
    col: number;
    row: number;
    direction: Direction;
};

export type Grid = {
    rows: number;
    cols: number;
    grid: {
        row: number;
        col: number;
    }[];
    width: number;
    height: number;
    unit: number;
    spacing: number;
};
