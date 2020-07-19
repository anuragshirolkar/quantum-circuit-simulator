import { List, Map } from 'immutable'
import { addLayer, Circuit, initCircuit, Layer, validateCircuit, simulate } from '../src/circuit'
import { X, Z } from '../src/gate'
import { WaveFunction } from '../src/wavefunction'

describe('construction', () => {
    const emptyCircuit2: Circuit = {
        nQ: 2,
        nC: 0,
        layers: List([])
    }

    test('initializes empty circuit', () => {
        expect(initCircuit(1, 2)).toEqual({
            nQ: 1,
            nC: 2,
            layers: List([])
        })
    })

    test('adds layers to a ciruit', () => {
        const layer: Layer = {
            type: "Gate",
            gate: X,
            inputs: [0]
        }

        // Act
        const resultCircuit = addLayer(layer, emptyCircuit2)

        // Assert
        const expectedCircuit = {
            nQ: 2,
            nC: 0,
            layers: List([{
                type: "Gate",
                gate: X,
                inputs: [0]
            }])
        }
        expect(resultCircuit).toEqual(expectedCircuit)
    })

    test('throws for invalid addition of layer', () => {
        const layer: Layer = {
            type: 'Measurement',
            input: 0,
            output: 0
        }

        expect(() => addLayer(layer, emptyCircuit2)).toThrow()
    })
})

describe('circuit validation', () => {
    test('fewer qubits in gate layer', () => {
        const circuit: Circuit = {
            nQ: 0,
            nC: 0,
            layers: List([{
                type: 'Gate',
                inputs: [0],
                gate: X
            }])
        }
        
    })

    test('fewer qubits in conditional gate layer', () => {
        const circuit: Circuit = {
            nQ: 0,
            nC: 1,
            layers: List([{
                type: 'ConditionalGate',
                inputs: [0],
                condition: 0,
                gate: X
            }])
        }
        expect(validateCircuit(circuit)).toBe(false)
    })

    test('fewer classical bits in conditional gate layer', () => {
        const circuit: Circuit = {
            nQ: 1,
            nC: 0,
            layers: List([{
                type: 'ConditionalGate',
                inputs: [0],
                condition: 0,
                gate: X
            }])
        }
        expect(validateCircuit(circuit)).toBe(false)
    })

    test('fewer qubits in measurement layer', () => {
        const circuit: Circuit = {
            nQ: 0,
            nC: 1,
            layers: List([{
                type: 'Measurement',
                input: 0,
                output: 0
            }])
        }
        expect(validateCircuit(circuit)).toBe(false)
    })

    test('fewer classical bits in measurement layer', () => {
        const circuit: Circuit = {
            nQ: 1,
            nC: 0,
            layers: List([{
                type: 'Measurement',
                input: 0,
                output: 0
            }])
        }
        expect(validateCircuit(circuit)).toBe(false)
    })
})

describe('simulation', () => {
    const zeroWf1: WaveFunction = {
        nBits: 1,
        map: Map([[0, 1]])
    }
    const trueRandom = Math.random

    afterEach(() => {
        Math.random = trueRandom
    })

    test('correctly simulates gate layer', () => {
        const circuit: Circuit = {
            nQ: 1,
            nC: 0,
            layers: List([{
                type: 'Gate',
                gate: X,
                inputs: [0]
            }])
        }
        
        // Act
        const { q, c } = simulate(circuit, { q: zeroWf1, c: List([]) })

        // Assert
        expect(q.nBits).toBe(1)
        expect(c).toEqual(List([]))
        expect(q.map.size).toBe(1)
        expect(q.map.get(1)).toBe(1)
    })

    test('correctly simulates conditional layer with false condition', () => {
        const circuit: Circuit = {
            nQ: 1,
            nC: 1,
            layers: List([{
                type: 'ConditionalGate',
                gate: X,
                inputs: [0],
                condition: 0
            }])
        }

        // Act
        const inputReg = { q: zeroWf1, c: List([0]) }
        const outputReg = simulate(circuit, inputReg)

        // Assert
        expect(outputReg).toEqual(inputReg)
    })

    test('correctly simulates conditional layer with true condition', () => {
        const circuit: Circuit = {
            nQ: 1,
            nC: 1,
            layers: List([{
                type: 'ConditionalGate',
                gate: X,
                inputs: [0],
                condition: 0
            }])
        }

        // Act
        const inputReg = { q: zeroWf1, c: List([1]) }
        const { q, c } = simulate(circuit, inputReg)

        // Assert
        expect(q.nBits).toBe(1)
        expect(c).toEqual(inputReg.c)
        expect(q.map.size).toBe(1)
        expect(q.map.get(1)).toBe(1)
    })

    test('measurement gate - measurement is stored in output and wavefunction is collapsed', () => {
        // Arrange
        Math.random = () => 0.99

        const circuit: Circuit = {
            nQ: 1,
            nC: 1,
            layers: List([{
                type: 'Measurement',
                input: 0,
                output: 0
            }])
        }

        const wf: WaveFunction = {
            nBits: 1,
            map: Map([[0, Math.SQRT1_2], [1, Math.SQRT1_2]])
        }

        // Act
        const inputReg = { q: wf, c: List([0]) }
        const { q, c } = simulate(circuit, inputReg)

        // Assert
        expect(c).toEqual(List([1]))
        expect(q.nBits).toBe(1)
        expect(q.map.size).toBe(1)
        expect(q.map.get(1)).toBe(1)
    })
})