import { Map } from "immutable"
import { range } from "mathjs"
import { nthBit } from './bits'
import { sum } from './utils'

export interface WaveFunction {
    map: Map<number, number>
    nBits: number
}

export function collapse(index: number, value: number, wf: WaveFunction): WaveFunction {
    var nonNormalizedCollapsedWaveFunctionMap = wf.map
        .filter((alpha, outcome) => nthBit(index, outcome) == value)
    var denominator = Math.sqrt(sum(nonNormalizedCollapsedWaveFunctionMap.valueSeq().toArray().map(a => a*a)))
    return {
        ...wf,
        map: nonNormalizedCollapsedWaveFunctionMap.map(alpha => alpha/denominator)
    }
}

export function sample(index: number, wf: WaveFunction): number {
    const probability0 =
        sum(wf.map
        .filter((alpha, outcome) => nthBit(index, outcome) == 0)
        .map(alpha => alpha**2)
        .valueSeq().toArray())
    if (Math.random() > probability0) {
        return 1
    }
    return 0
}

/**
 * Returns the list of probability amplitudes from the map.
 * @param wf wave function
 */
export function stateVector(wf: WaveFunction): number[] {
    return Array.from(Array(2**wf.nBits).keys())
        .map(i => wf.map.get(i, 0))
}

/**
 * Returns the wave function corresponding to the given list of probability amplitudes.
 * @param sv list of probability amplitudes
 * @param nBits number of bits
 */
export function fromStateVector(sv: number[], nBits: number): WaveFunction {
    const map = Map(sv.map((value, index) => [index, value] as [number, number])
        .filter(([index, value]) => value != 0))
    return {
        nBits,
        map
    }
}