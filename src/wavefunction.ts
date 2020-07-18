import { Map } from "immutable"
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
