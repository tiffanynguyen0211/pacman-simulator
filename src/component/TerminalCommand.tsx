import './TerminalCommand.scss';

import { KeyboardEvent, useRef } from 'react';

import {
    formattedPlaceCommand,
    placeCommandRegex,
    printReport,
    turnLeftDirection,
    turnRightDirection,
} from '../utils/formatCommand';
import { isWithinGrid } from '../utils/grid';
import { PacManPosition } from '../utils/types';

export const TerminalCommand: React.FC<{
    pacMan: PacManPosition;
    setPacMan: (newPacmanPosition: PacManPosition) => void;
}> = ({ pacMan, setPacMan }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalResultRef = useRef<HTMLDivElement>(null);

    function logCommandHistory(text: string) {
        const terminal = terminalResultRef.current;
        if (terminal) {
            terminal.innerHTML += `<p>${text.toUpperCase()}</p>`;
            // scroll to latest terminal log
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
    function clearInput() {
        if (inputRef && inputRef.current) {
            inputRef.current.value = '';
        }
    }

    function checkCommand(text: string) {
        clearInput();
        switch (true) {
            case text === 'report': {
                const result = printReport(pacMan);
                logCommandHistory(`<p>Output: ${result.toUpperCase()}</p>`);
                break;
            }
            case text === 'left': {
                const leftDirection = turnLeftDirection(pacMan.direction);
                setPacMan({
                    ...pacMan,
                    direction: leftDirection,
                });
                break;
            }
            case text === 'right': {
                const rightDirection = turnRightDirection(pacMan.direction);
                setPacMan({
                    ...pacMan,
                    direction: rightDirection,
                });
                break;
            }
            case placeCommandRegex.test(text): {
                const {
                    row,
                    col,
                    direction: placeDirection,
                } = formattedPlaceCommand(text);
                if (isWithinGrid(row, col)) {
                    setPacMan({
                        row: Number(row),
                        col: Number(col),
                        direction: placeDirection,
                    });
                    break;
                }

                logCommandHistory(
                    `<p>${'Uh Oh cannot move there!'.toUpperCase()}</p>`,
                );
                break;
            }
            case text === 'move': {
                let { col, row } = pacMan;
                const { direction } = pacMan;
                if (direction === 'east') col -= 1;
                else if (direction === 'west') col += 1;
                else if (direction === 'north') row += 1;
                else if (direction === 'south') row -= 1;

                if (isWithinGrid(row, col)) {
                    setPacMan({
                        row: Number(row),
                        col: Number(col),
                        direction,
                    });
                    break;
                }

                logCommandHistory(
                    `<p>${'Uh Oh cannot move there!'.toUpperCase()}</p>`,
                );
                break;
            }
            default: {
                // eslint-disable-next-line no-console
                console.log('Command not found');
            }
        }
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const command = e.currentTarget.value.toLowerCase();
            logCommandHistory(command);
            checkCommand(command);
        }
    }

    return (
        <div className="terminal-container">
            <div className="terminal-result" ref={terminalResultRef}></div>
            <input
                className="terminal-input"
                type="text"
                onKeyDown={handleKeyPress}
                ref={inputRef}
                onInput={(e) => {
                    e.currentTarget.value =
                        `${e.currentTarget.value}`.toUpperCase();
                }}
                placeholder="Try typing MOVE | RIGHT | LEFT | PLACE (0,0,WEST)..."
            />
        </div>
    );
};
