import { exp } from 'mathjs'
import { identityGate, transformGate } from '../src/gate'

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