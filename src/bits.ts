
export function nthBit(n: number, input: number): number {
    return (input >> n) & 1
}

export function flipNthBit(n: number, input: number): number {
    return input ^ (1 << n)
}

export function bitArray(n: number, size: number): number[] {
    return [...Array(size).keys()]
        .map(i => (n >> i) & 1)
}

export function fromBitArray(bits: number[]): number {
    return bits
        .map((bit, index) => bit << index)
        .reduce((a,b) => a+b, 0)
}
