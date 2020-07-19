import { Gate, identityGate, transformGate } from "./gate"
import * as math from 'mathjs'
import { List } from 'immutable'
import { WaveFunction } from "./wavefunction"


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

export function validateCircuit({nQ, nC, layers}: Circuit): boolean {
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