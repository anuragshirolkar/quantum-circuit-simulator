import { addLayer, Circuit, initCircuit } from '../src/circuit'
import { X } from '../src/gate'

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