import * as math from 'mathjs'
import { bitArray, fromBitArray } from './bits'
import { fromStateVector, stateVector, WaveFunction } from './wavefunction'

/**
 * @param indices indices to be pushed to the top
 * @param size size of the bit representation (size of the matrix)
 */
function bitsTransformationMatrix(indices: number[], size: number): number[][] {
    const rearrangedRange = indices.concat(
        Array.from(Array(size).keys())
            .filter(k => !indices.includes(k)))

    return math.transpose(rearrangedRange.map(i => getUnitAxis(i, size)))
}

/**
 * 
 * @param activeIndex index at which the value is 1, the rest are 0
 * @param size size of the vector
 */
function getUnitAxis(activeIndex: number, size: number): number[] {
    const arr = Array(size).fill(0)
    arr[activeIndex] = 1
    return arr
}

function transformPosition(btm: number[][], index: number, size: number): number {
    const bits = bitArray(index, size)
    const newPositionBits = math.multiply(bits, btm)
    return fromBitArray(newPositionBits)
}

function positionTransformationMatrix(indices: number[], size: number): number[][] {
    const matrixSize = 2**size
    const btm = bitsTransformationMatrix(indices, size)

    return Array.from(Array(matrixSize).keys())
        .map(i => transformPosition(btm, i, size))
        .map(i => getUnitAxis(i, matrixSize))
}

export interface Gate {
    transformer: number[][]
    size: number
}

function extendGateWithIdentity(gate: Gate, nBits: number): Gate {
    const idSize = 2**(nBits - gate.size)
    const idMatrix = math.identity(idSize) as math.Matrix
    return {
        transformer: math.kron(idMatrix, gate.transformer).valueOf() as number[][],
        size: nBits
    }
}


/**
 * @param gate original gate
 * @param indices indices that need to be connected to original gate
 * @param nBits total number of bits in the ciruit
 */
export function transformGate(gate: Gate, indices: number[], nBits: number): Gate {
    const ptm = positionTransformationMatrix(indices, nBits)
    const extendedGate = extendGateWithIdentity(gate, nBits)

    return {
        transformer: math.multiply(math.multiply(ptm, extendedGate.transformer), math.inv(ptm)),
        size: nBits
    }
}

export function identityGate(size: number): Gate {
    return {
        transformer: math.identity(2**size).valueOf() as number[][],
        size
    }
}

/**
 * Returns in the new wave function of qubits after applying the gate.
 * @param gate the gate to be applied to the qubits
 * @param wf wave function of qubits
 */
export function applyGate(gate: Gate, wf: WaveFunction): WaveFunction {
    if (gate.size != wf.nBits) {
        throw new Error('Gate and wave function sizes are not equal')
    }
    return fromStateVector(
        math.multiply(stateVector(wf), gate.transformer),
        wf.nBits)
}

/**
 * Common gates
 */

 // Controlled not gate
export const CNOT = {
    transformer: [
        [1, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0]
    ],
    size: 2
}

// Bit flip gate
export const X = {
    transformer: [
        [0, 1],
        [1, 0]
    ],
    size: 1
}

// Phase flip gate
export const Z = {
    transformer: [
        [1, 0],
        [0, -1]
    ],
    size: 1
}

// Hadamard gate
export const H = {
    transformer: [
        [Math.SQRT1_2, Math.SQRT1_2],
        [Math.SQRT1_2, -Math.SQRT1_2]
    ],
    size: 1
}