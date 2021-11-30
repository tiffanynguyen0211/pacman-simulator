import './GameGrid.scss';

import classnames from 'classnames';

import { Grid, PacManPosition } from '../utils/types';

export const GameGrid: React.FC<{
    displayGrid: Grid;
    pacMan: PacManPosition;
}> = ({ displayGrid: { width, height, unit, spacing, grid }, pacMan }) => {
    return (
        <div className="grid-container">
            <div
                className="grid"
                style={{
                    width,
                    height,
                }}
            >
                {grid.map((eachGrid) => (
                    <div
                        key={`${eachGrid.row.toString()}-${eachGrid.col.toString()}`}
                        className={classnames('grid-item', {
                            pacman:
                                pacMan.row === eachGrid.row &&
                                pacMan.col === eachGrid.col,
                            [`pacman--${pacMan.direction}`]:
                                pacMan.row === eachGrid.row &&
                                pacMan.col === eachGrid.col &&
                                pacMan.direction,
                        })}
                        style={{
                            width: unit,
                            height: unit,
                            margin: spacing,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};
