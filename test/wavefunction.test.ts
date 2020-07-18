import { Map } from 'immutable'
import { WaveFunction, collapse, sample, stateVector, fromStateVector } from '../src/wavefunction'

const uwf1: WaveFunction = {
    nBits: 1,
    map: Map([
        [0, Math.SQRT1_2],
        [1, Math.SQRT1_2]
    ])
}

const uwf2: WaveFunction = {
    nBits: 2,
    map: Map([
        [0, 1/2],
        [1, 1/2],
        [2, 1/2],
        [3, 1/2]
    ])
}

describe('collapse', () => {
    test('correctly collapses the wavefunction in a single bit system', () => {
        // Act
        const resultWf = collapse(0, 0, uwf1)
    
        // Assert
        expect(resultWf.nBits).toBe(1)
        expect(resultWf.map.size).toBe(1)
        expect(resultWf.map.get(0)).toBeCloseTo(1, 5)
    })
    
    test('correctly collapses the wavefunction in a multiple bit system', () => {
        // Act
        const resultWf = collapse(0, 0, uwf2)
        
        // Assert
        expect(resultWf.nBits).toBe(2)
        expect(resultWf.map.size).toBe(2)
        expect(resultWf.map.get(0)).toBeCloseTo(Math.SQRT1_2, 5)
        expect(resultWf.map.get(2)).toBeCloseTo(Math.SQRT1_2, 5)
    })
})

describe('sample', () => {
    const trueRandom = Math.random

    beforeEach(() => {
        Math.random = trueRandom
    })
    
    test('returns 0 for uniform bit with mocked random to 0.1', () => {
        // Arrange
        Math.random = () => 0.1

        // Act, Assert
        expect(sample(0, uwf2)).toBe(0)
    })

    test('returns 1 for uniform bit with mocked random to 0.9', () => {
        // Arrange
        Math.random = () => 0.9

        // Act, Assert
        expect(sample(0, uwf2)).toBe(1)
    })
})

describe('state vector', () => {
    const wf: WaveFunction = {
        nBits: 2,
        map: Map([
            [0, Math.SQRT1_2],
            [2, Math.SQRT1_2]])
    }

    const sv = [ Math.SQRT1_2, 0, Math.SQRT1_2, 0 ]

    test('correctly returns the state vector', () => {
        expect(stateVector(wf)).toEqual(sv)
    })

    test('correctly constructs wave function from the state vector', () => {
        expect(fromStateVector(sv, 2)).toEqual(wf)
    })
})