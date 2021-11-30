import { Direction, PacManPosition } from './types';

export const placeCommandRegex = /^place\s[0-9],[0-9],(north|west|east|south)$/;

export const formattedPlaceCommand = (
    text: string,
): { row: number; col: number; direction: Direction } => {
    const newPosition = text.substr(6);
    const row = Number(newPosition.split(',')[0]);
    const col = Number(newPosition.split(',')[1]);
    const direction = newPosition.split(',')[2] as Direction;

    return { row, col, direction };
};

export const printReport = ({
    row,
    col,
    direction,
}: PacManPosition): string => {
    return `${col},${row},${direction}`;
};

export const turnLeftDirection = (direction: Direction): Direction => {
    switch (direction) {
        case 'east': {
            return 'north';
        }
        case 'north': {
            return 'west';
        }
        case 'west': {
            return 'south';
        }
        default: {
            return 'east';
        }
    }
};

export const turnRightDirection = (direction: Direction): Direction => {
    switch (direction) {
        case 'east': {
            return 'south';
        }
        case 'south': {
            return 'west';
        }
        case 'west': {
            return 'north';
        }
        default: {
            return 'east';
        }
    }
};
