import { List, Map } from "immutable";
import { addLayer, Circuit, initCircuit, Register, simulate } from "./circuit";
import { CNOT, H } from "./gate";
import { printWaveFunction } from "./wavefunction";


const bellCircuit: Circuit =
    addLayer({
        type: 'Gate',
        gate: CNOT,
        inputs: [0, 1]
    }, addLayer({
        type: 'Gate',
        gate: H,
        inputs: [0]
    }, initCircuit(2, 0)))

const input: Register = {
    c: List([]),
    q: {
        nBits: 2,
        map: Map([[0, 1]])
    }
}

const output = simulate(bellCircuit, input)

printWaveFunction(output.q)