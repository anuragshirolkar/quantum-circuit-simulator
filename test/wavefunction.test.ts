import { Map } from 'immutable'
import { WaveFunction, collapse } from '../src/wavefunction'

test('correctly collapses the wavefunction in a single bit system', () => {
    const wf: WaveFunction = {
        nBits: 1,
        map: Map([
            [0, Math.SQRT1_2],
            [1, Math.SQRT1_2]
        ])
    }
    // Act
    const resultWf = collapse(0, 0, wf)

    // Assert
    expect(resultWf.map.size).toBe(1)
    expect(resultWf.map.get(0)).toBeCloseTo(1, 5)
})

test('correctly collapses the wavefunction in a multiple bit system', () => {
    const wf: WaveFunction = {
        nBits: 2,
        map: Map([
            [0, 1/2],
            [1, 1/2],
            [2, 1/2],
            [3, 1/2]
        ])
    }

    // Act
    const resultWf = collapse(0, 0, wf)
    
    // Assert
    expect(resultWf.nBits).toBe(2)
    expect(resultWf.map.size).toBe(2)
    expect(resultWf.map.get(0)).toBeCloseTo(Math.SQRT1_2, 5)
    expect(resultWf.map.get(2)).toBeCloseTo(Math.SQRT1_2, 5)
})