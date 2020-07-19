import { List } from 'immutable'
import { addLayer, Circuit, initCircuit, Layer, validateCircuit } from '../src/circuit'
import { X, Z } from '../src/gate'

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