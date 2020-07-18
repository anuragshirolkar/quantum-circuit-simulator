import { printWaveFunction, WaveFunction } from "./wavefunction"
import { Map } from 'immutable'
import { Circuit, resolveCircuit } from "./circuit"
import { applyGate, CNOT, H } from "./gate"
import { entangle } from "./entanglement"


const wf0: WaveFunction = {
    nBits: 1,
    map: Map([[0, 1]])
}

const bellCircuit: Circuit = {
    size: 2,
    layers: [
        { inputs: [0], gate: H },
        { inputs: [0, 1], gate: CNOT }
    ]
}

const bellState = applyGate(
    resolveCircuit(bellCircuit),
    entangle(wf0, wf0)
)

printWaveFunction(bellState)