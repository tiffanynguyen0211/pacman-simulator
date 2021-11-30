import axe from 'axe-core';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ReactElement } from 'react';

import { mountToDoc } from '../../.jest/jest-setup';
import { PacManPosition } from '../utils/types';
import { TerminalCommand } from './TerminalCommand';

const setup = (
    render: (x: ReactElement) => ReactWrapper | ShallowWrapper,
    props: JSX.IntrinsicAttributes,
) => {
    const defaultProps: {
        pacMan: PacManPosition;
        setPacMan: (newPacmanPosition: PacManPosition) => void;
    } = {
        pacMan: { col: 0, row: 0, direction: 'west' },
        setPacMan: jest.fn().mockImplementation((value) => value),
    };

    const component = render(<TerminalCommand {...defaultProps} {...props} />);

    return {
        actual: component,
    };
};

describe('Terminal Command', () => {
    it('should match snapshot on first render', () => {
        const { actual } = setup(shallow, {});
        expect(toJson(actual)).toMatchSnapshot();
    });

    it('should pass first test case', () => {
        const { actual } = setup(mount, {});
        actual.update();
        const input = actual.find('input');
        const inputEl = input.getDOMNode<HTMLInputElement>();
        const resultLog = actual.find('.terminal-result');

        inputEl.value = 'PLACE 0,0,NORTH';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(1);
        let updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock
            .results[0].value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'MOVE';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(2);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[1]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'REPORT';
        input.simulate('keyDown', { key: 'Enter' });

        expect(resultLog.getDOMNode().innerHTML).toMatch(/OUTPUT: 0,1,NORTH/);
    });

    it('should pass second test case', () => {
        const { actual } = setup(mount, {});
        actual.update();
        const input = actual.find('input');
        const inputEl = input.getDOMNode<HTMLInputElement>();
        const resultLog = actual.find('.terminal-result');

        inputEl.value = 'PLACE 0,0,NORTH';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(1);
        let updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock
            .results[0].value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'LEFT';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(2);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[1]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'REPORT';
        input.simulate('keyDown', { key: 'Enter' });

        expect(resultLog.getDOMNode().innerHTML).toMatch(/OUTPUT: 0,0,WEST/);
    });

    it('should pass third test case', () => {
        const { actual } = setup(mount, {});
        actual.update();
        const input = actual.find('input');
        const inputEl = input.getDOMNode<HTMLInputElement>();
        const resultLog = actual.find('.terminal-result');

        inputEl.value = 'PLACE 1,2,EAST';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(1);
        let updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock
            .results[0].value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'MOVE';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(2);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[1]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'MOVE';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(3);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[2]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'LEFT';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(4);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[3]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'move';
        input.simulate('keyDown', { key: 'Enter' });
        expect(actual.prop('setPacMan')).toHaveBeenCalledTimes(5);
        updatedPacman = (actual.prop('setPacMan') as jest.Mock).mock.results[4]
            .value;
        actual.setProps({ pacMan: updatedPacman });
        actual.update();

        inputEl.value = 'REPORT';
        input.simulate('keyDown', { key: 'Enter' });

        expect(resultLog.getDOMNode().innerHTML).toMatch(/OUTPUT: 0,2,NORTH/);
    });

    it('has no accessibility violations', () => {
        const { actual } = setup(mountToDoc, {});
        const componentNode = actual.getDOMNode();

        axe.run(componentNode, (err, { violations }) => {
            expect(err).toBe(null);
            expect(violations).toHaveLength(0);
        });
    });
});
