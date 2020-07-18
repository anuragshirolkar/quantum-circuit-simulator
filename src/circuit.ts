import { Gate, identityGate, transformGate } from "./gate"
import * as math from 'mathjs'


export interface Circuit {
    size: number
    layers: Layer[]
}

interface Layer {
    gate: Gate
    inputs: number[]
}

export function initCircuit(size: number): Circuit {
    return {
        size,
        layers: []
    }
}

export function addLayer(gate: Gate, inputs: number[], circuit: Circuit): Circuit {
    return {
        ...circuit,
        layers: [...circuit.layers, {
            gate, inputs
        }]
    }
}

/**
 * Abstracts a circuit into a single gate that has the same effect as the circuit.
 * @param circuit circuit to be abstracted into a gate
 */
export function resolveCircuit(circuit: Circuit): Gate {
    return circuit.layers
        .reduce(joinGates, identityGate(circuit.size))

    function joinGates(acc: Gate, { gate, inputs }: Layer): Gate {
        const expandedGate = transformGate(gate, inputs, acc.size)
        return {
            size: acc.size,
            transformer: math.multiply(acc.transformer, expandedGate.transformer)
        }
    }
}