import { isWithinGrid } from './grid';

describe('grid layout caculatiom', () => {
    it('should check correctly if cordinate is within 5x5 grid', () => {
        expect(isWithinGrid(5, 5)).toBe(false);
        expect(isWithinGrid(-1, 5)).toBe(false);
        expect(isWithinGrid(1, -5)).toBe(false);
        expect(isWithinGrid(4, 4)).toBe(true);
        expect(isWithinGrid(0, 4)).toBe(true);
        expect(isWithinGrid(4, 0)).toBe(true);
    });
});
