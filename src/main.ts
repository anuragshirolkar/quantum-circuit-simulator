import { List, Map } from "immutable";
import { addLayer, addLayers, Circuit, initCircuit, Layer, Register, simulate } from "./circuit";
import { entangle } from "./entanglement";
import { CNOT, H, X, Z } from "./gate";
import { printWaveFunction } from "./wavefunction";

// Bell circuit
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

// Teleportation circuit
const teleportationCircuit: Circuit = 
    addLayers([
        {
            type: 'Gate',
            gate: H,
            inputs: [1]
        }, {
            type: 'Gate',
            gate: CNOT,
            inputs: [1, 2]
        }, {
            type: 'Gate',
            gate: CNOT,
            inputs: [0, 1]
        }, {
            type: 'Gate',
            gate: H,
            inputs: [0]
        }, {
            type: 'Measurement',
            input: 0,
            output: 0
        }, {
            type: 'Measurement',
            input: 1,
            output: 1
        }, {
            type: 'ConditionalGate',
            gate: Z,
            inputs: [2],
            condition: 0
        }, {
            type: 'ConditionalGate',
            gate: X,
            inputs: [2],
            condition: 1
        }
    ], initCircuit(3, 2))

const teleportationInput: Register = {
    c: List([0, 0]),
    q: {
        nBits: 3,
        map: Map([
            [0, Math.sqrt(0.4)],
            [1, Math.sqrt(0.6)]
        ])
    }
}

printWaveFunction(teleportationInput.q)

const teleportationOutput = simulate(teleportationCircuit, teleportationInput)

printWaveFunction(teleportationOutput.q)