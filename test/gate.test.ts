import { exp } from 'mathjs'
import { applyGate, identityGate, transformGate, X } from '../src/gate'
import { Map } from 'immutable'
import { WaveFunction } from '../src/wavefunction'

describe('transform gate', () => {
    const gate1 = {
        transformer: [[1, 2], [3, 4]],
        size: 1
    }
    const gate2 = {
        transformer: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ],
        size: 2
    }

    test('single bit gate without extension | gate is returned as is', () => {
        // Act
        const transformedGate = transformGate(gate1, [0], 1)

        // Assert
        expect(transformedGate).toEqual(gate1)
    })

    test('2 bit gate without extension | bits reversed', () => {
        // Act
        const transformedGate = transformGate(gate2, [1,0], 2)

        // Assert
        const expectedGate = {
            transformer: [
                [1, 3, 2, 4],
                [9, 11, 10 ,12],
                [5, 7, 6, 8],
                [13, 15, 14, 16]
            ],
            size: 2
        }
        expect(transformedGate).toEqual(expectedGate)
    })

    test('single bit gate with extension', () => {
        // Act
        const transformedGate = transformGate(gate1, [0], 2)

        // Assert
        const expectedGate = {
            transformer: [
                [1, 2, 0, 0],
                [3, 4, 0, 0],
                [0, 0, 1, 2],
                [0, 0, 3, 4]
            ],
            size: 2
        }
        expect(transformedGate).toEqual(expectedGate)
    })

    test('single bit gate with extension and rearrangement', () => {
        // Act
        const transformedGate = transformGate(gate1, [1], 2)

        // Assert
        const expectedGate = {
            transformer: [
                [1, 0, 2, 0],
                [0, 1, 0, 2],
                [3, 0, 4, 0],
                [0, 3, 0, 4]
            ],
            size: 2
        }
        expect(transformedGate).toEqual(expectedGate)
    })
})

describe('construction', () => {
    test('identity gate', () => {
        const identityGate1 = {
            transformer: [
                [ 1, 0 ],
                [ 0, 1 ]
            ],
            size: 1
        }
        expect(identityGate(1)).toEqual(identityGate1)
    })
})

describe('gate application', () => {
    test('correctly returns the result of applying X gate on a single qubit', () => {
        const wf: WaveFunction = {
            nBits: 1,
            map: Map([
                [0, Math.sqrt(0.1)],
                [1, Math.sqrt(0.9)]
            ])
        }

        // Act
        const wfAfterX = applyGate(X, wf)

        // Assert
        expect(wfAfterX.nBits).toBe(1)
        expect(wfAfterX.map.get(0)).toBe(Math.sqrt(0.9))
        expect(wfAfterX.map.get(1)).toBe(Math.sqrt(0.1))
    })

    test('correctly returns the result of applying X gate on a 2 qubit system', () => {
        const wf: WaveFunction = {
            nBits: 2,
            map: Map([
                [0, Math.sqrt(0.1)],
                [1, Math.sqrt(0.9)]
            ])
        }

        const gate = transformGate(X, [1], 2)

        // Act
        const wfAfterX = applyGate(gate, wf)

        // Assert
        expect(wfAfterX.nBits).toBe(2)
        expect(wfAfterX.map.get(2)).toBe(Math.sqrt(0.1))
        expect(wfAfterX.map.get(3)).toBe(Math.sqrt(0.9))
    })

    test('throws error when wave function and gate sizes don\'t match', () => {
        expect(() => applyGate(X, { nBits: 2, map: Map() })).toThrow()
    })
})