import { addLayer, Circuit, initCircuit, resolveCircuit } from '../src/circuit'
import { X, Z } from '../src/gate'

describe('construction', () => {
    const emptyCircuit2: Circuit = {
        size: 2,
        layers: []
    }

    test('initializes empty circuit', () => {
        expect(initCircuit(1)).toEqual({
            size: 1,
            layers: []
        })
    })

    test('adds layers to a ciruit', () => {
        // Act
        const resultCircuit = addLayer(X, [0], emptyCircuit2)

        // Assert
        const expectedCircuit = {
            size: 2,
            layers: [{
                gate: X,
                inputs: [0]
            }]
        }
        expect(resultCircuit).toEqual(expectedCircuit)
    })
})

describe(resolveCircuit, () => {
    test('correctly resolves a circuit into an equivalent abstract gate', () => {
        const circuit: Circuit = {
            size: 2,
            layers: [
                { inputs: [0], gate: X },
                { inputs: [1], gate: Z }
            ]
        }

        // Act
        const resultGate = resolveCircuit(circuit)

        // Assert
        expect(resultGate.size).toBe(2)
        // since the two gates are applied on different qubits, the resulting
        // gate is `X <tensor-product> Z`
        expect(resultGate.transformer).toEqual([
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, -1],
            [0, 0, -1, 0]
        ])
    })
})