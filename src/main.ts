import { List, Map } from "immutable";
import { Circuit, Register, simulate } from "./circuit";
import { CNOT, H } from "./gate";
import { printWaveFunction } from "./wavefunction";


const bellCircuit: Circuit = {
    nC: 0,
    nQ: 2,
    layers: List([
        {
            type: 'Gate',
            gate: H,
            inputs: [0]
        }, {
            type: 'Gate',
            gate: CNOT,
            inputs: [0, 1]
        }
    ])
}

const input: Register = {
    c: List([]),
    q: {
        nBits: 2,
        map: Map([[0, 1]])
    }
}

const output = simulate(bellCircuit, input)

printWaveFunction(output.q)