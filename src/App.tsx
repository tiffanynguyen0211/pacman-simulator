import { useEffect, useState } from 'react';

import { GameGrid } from './component/GameGrid';
import { TerminalCommand } from './component/TerminalCommand';
import { initGrid } from './utils/grid';
import { Grid, PacManPosition } from './utils/types';

export const App: React.FC = () => {
    const [currentGrid, setGrid] = useState<Grid | null>(null);
    const [pacMan, setPacMan] = useState<PacManPosition>({
        row: 0,
        col: 0,
        direction: 'west',
    });

    useEffect(() => {
        setGrid(initGrid());
    }, []);

    return (
        <div className="container">
            {currentGrid && (
                <>
                    <GameGrid displayGrid={currentGrid} pacMan={pacMan} />
                    <TerminalCommand pacMan={pacMan} setPacMan={setPacMan} />
                </>
            )}
            {!currentGrid && <p>Setting up...</p>}
        </div>
    );
};
