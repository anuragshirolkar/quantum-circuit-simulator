import { Map } from "immutable"
import { nthBit } from './bits'
import { sum } from './utils'

export interface WaveFunction {
    map: Map<number, number>
    nBits: number
}

export function collapse(index: number, value: number, waveFunction: WaveFunction): WaveFunction {
    var nonNormalizedCollapsedWaveFunctionMap = waveFunction.map
        .filter((alpha, outcome) => nthBit(index, outcome) == value)
    var denominator = Math.sqrt(sum(nonNormalizedCollapsedWaveFunctionMap.valueSeq().toArray().map(a => a*a)))
    return {
        ...waveFunction,
        map: nonNormalizedCollapsedWaveFunctionMap.map(alpha => alpha/denominator)
    }
}

