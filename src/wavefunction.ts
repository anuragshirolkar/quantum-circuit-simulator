import { Map } from "immutable"


interface WaveFunction {
    map: Map<number, number>
    nBits: number
}

function collapse(index: number, value: number, waveFunction: WaveFunction): WaveFunction {
    var nonNormalizedCollapsedWaveFunctionMap = waveFunction.map
        .filter((alpha, outcome) => nthBit(index, outcome) == value)
    var denominator = Math.sqrt(sum(nonNormalizedCollapsedWaveFunctionMap.valueSeq().toArray().map(a => a*a)))
    return {
        ...waveFunction,
        map: nonNormalizedCollapsedWaveFunctionMap.map(alpha => alpha/denominator)
    }
}

