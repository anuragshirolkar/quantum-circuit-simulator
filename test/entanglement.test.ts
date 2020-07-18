import { entangle } from '../src/entanglement'
import { WaveFunction } from '../src/wavefunction'
import { Map } from 'immutable'

describe(entangle, () => {
    test('correctly entangles 2 qubits', () => {
        const wf1: WaveFunction = {
            nBits: 1,
            map: Map([
                [0, Math.sqrt(0.1)],
                [1, Math.sqrt(0.9)]
            ])
        }

        const wf2: WaveFunction = {
            nBits: 1,
            map: Map([
                [0, Math.sqrt(0.4)],
                [1, Math.sqrt(0.6)]
            ])
        }

        // Act
        const resultWf = entangle(wf1, wf2)

        // Assert
        expect(resultWf.nBits).toBe(2)
        expect(resultWf.map.size).toBe(4)
        expect(resultWf.map.get(0)).toBeCloseTo(Math.sqrt(0.04), 5)
        expect(resultWf.map.get(1)).toBeCloseTo(Math.sqrt(0.36), 5)
        expect(resultWf.map.get(2)).toBeCloseTo(Math.sqrt(0.06), 5)
        expect(resultWf.map.get(3)).toBeCloseTo(Math.sqrt(0.54), 5)
    })
})