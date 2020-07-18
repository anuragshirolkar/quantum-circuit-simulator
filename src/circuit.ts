import { Gate } from "./gate";


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