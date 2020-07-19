import { applyGate, Gate, identityGate, transformGate } from "./gate"
import * as math from 'mathjs'
import { List } from 'immutable'
import { sample, WaveFunction, collapse } from "./wavefunction"


export interface Circuit {
    nQ: number
    nC: number
    layers: List<Layer>
}

export type Layer =
    GateLayer & {
        type: 'Gate'
    } |
    ConditionalGateLayer & {
        type: 'ConditionalGate'
    } |
    MeasurementLayer & {
        type: 'Measurement'
    }

export interface GateLayer {
    gate: Gate
    inputs: number[]
}

export interface ConditionalGateLayer {
    condition: number
    gate: Gate
    inputs: number[]
}

export interface MeasurementLayer {
    input: number
    output: number
}

export function initCircuit(nQ: number, nC: number): Circuit {
    return {
        nQ,
        nC,
        layers: List([])
    }
}

export function addLayer(layer: Layer, circuit: Circuit): Circuit {
    const newCircuit = {
        ...circuit,
        layers: circuit.layers.push(layer)
    }
    if (validateCircuit(newCircuit)) return newCircuit
    throw new Error('Addition results in an invalid circuit')
}

export function validateCircuit({ nQ, nC, layers }: Circuit): boolean {
    return layers.every(layer => {
        if (layer.type == 'Gate') return validateGateLayer(nQ, layer)
        if (layer.type == 'ConditionalGate') return validateConditionalGateLayer(nQ, nC, layer)
        return validateMeasurementLayer(nQ, nC, layer)
    })
}

function validateGateLayer(nQ: number, layer: GateLayer): boolean {
    return layer.inputs.every(i => i < nQ)
}

function validateConditionalGateLayer(nQ: number, nC: number, layer: ConditionalGateLayer): boolean {
    return layer.inputs.every(i => i < nQ) && layer.condition < nC
}

function validateMeasurementLayer(nQ: number, nC: number, layer: MeasurementLayer): boolean {
    return layer.input < nQ && layer.output < nC
}

export interface Register {
    q: WaveFunction
    c: List<number>
}

export function simulate(circuit: Circuit, input: Register): Register {
    return circuit.layers
        .reduce((reg, layer) => {
            if (layer.type == 'Gate') return runGateLayer(layer, reg)
            if (layer.type == 'ConditionalGate') return runConditionalGateLayer(layer, reg)
            return runMeasurementLayer(layer, reg)
        }, input)
}

function runGateLayer({ gate, inputs }: GateLayer, { q, c }: Register): Register {
    const expandedGate = transformGate(gate, inputs, q.nBits)
    return {
        c,
        q: applyGate(expandedGate, q)
    }
}

function runConditionalGateLayer(
    { gate, condition, inputs }: ConditionalGateLayer,
    { q, c }: Register
): Register {
    if (c.get(condition) == 0) return { q, c }
    return runGateLayer({ gate, inputs }, {q,c} )
}

function runMeasurementLayer(
    { input, output }: MeasurementLayer,
    { q, c }: Register
): Register {
    const measurement = sample(input, q)
    return {
        q: collapse(input, measurement, q),
        c: c.set(output, measurement)
    }
}