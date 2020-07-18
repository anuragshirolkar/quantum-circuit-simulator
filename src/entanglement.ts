import { fromStateVector, stateVector, WaveFunction } from "./wavefunction"
import * as math from 'mathjs'

/**
 * Returns the combined wave function of the system of the 2 wave functions.
 */
export function entangle(wf1: WaveFunction, wf2: WaveFunction): WaveFunction {
    const sv1 = stateVector(wf1)
    const sv2 = stateVector(wf2)

    // outer product of the 2 vectors
    const svResult2D = math.multiply(math.transpose([sv2]), [sv1]).valueOf() as number[][]

    return fromStateVector(
        svResult2D.reduce((acc, cur) => acc.concat(cur), []),
        wf1.nBits + wf2.nBits)
}