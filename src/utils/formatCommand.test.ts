import {
    formattedPlaceCommand,
    placeCommandRegex,
    printReport,
    turnLeftDirection,
    turnRightDirection,
} from './formatCommand';

describe('terminal commands handling and formatting', () => {
    it('place command regex should return correct check', () => {
        expect(placeCommandRegex.test('place')).toBe(false);
        expect(placeCommandRegex.test('place123')).toBe(false);
        expect(placeCommandRegex.test('place 0,1,abcd')).toBe(false);
        expect(placeCommandRegex.test('place 0.1,1.1,abcd')).toBe(false);
        expect(placeCommandRegex.test('place 0,0,east')).toBe(true);
        expect(placeCommandRegex.test('place 0,0,west')).toBe(true);
        expect(placeCommandRegex.test('place 0,3,south')).toBe(true);
        expect(placeCommandRegex.test('place 0,5,north')).toBe(true);
    });

    it('place command should return correct position', () => {
        expect(formattedPlaceCommand('place 0,5,north')).toStrictEqual({
            direction: 'north',
            row: 0,
            col: 5,
        });
        expect(formattedPlaceCommand('place 0,3,west')).toStrictEqual({
            direction: 'west',
            row: 0,
            col: 3,
        });
        expect(formattedPlaceCommand('place 1,3,south')).toStrictEqual({
            direction: 'south',
            row: 1,
            col: 3,
        });
    });

    it('should return correct directions when turn left', () => {
        expect(turnLeftDirection('west')).toBe('south');
        expect(turnLeftDirection('south')).toBe('east');
        expect(turnLeftDirection('east')).toBe('north');
        expect(turnLeftDirection('north')).toBe('west');
    });

    it('should return correct directions when turn right', () => {
        expect(turnRightDirection('west')).toBe('north');
        expect(turnRightDirection('south')).toBe('west');
        expect(turnRightDirection('east')).toBe('south');
        expect(turnRightDirection('north')).toBe('east');
    });

    it('should print report in correct format', () => {
        expect(printReport({ row: 1, col: 1, direction: 'east' })).toBe(
            '1,1,east',
        );
        expect(printReport({ row: 2, col: 0, direction: 'west' })).toBe(
            '0,2,west',
        );
    });
});
