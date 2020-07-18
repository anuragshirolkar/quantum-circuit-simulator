import * as bits from '../src/bits'

test('returns nth bit in the binary representation', () => {
    expect(bits.nthBit(0, 5)).toBe(1)
    expect(bits.nthBit(1, 5)).toBe(0)
})

test('fips nth bit in the binary representation', () => {
    expect(bits.flipNthBit(0, 5)).toBe(4)
    expect(bits.flipNthBit(1, 5)).toBe(7)
})

test('returns list of bits', () => {
    expect(bits.bitArray(5, 4)).toEqual([1, 0, 1, 0])
})

test('returns number from it\'s binary representation', () => {
    expect(bits.fromBitArray([1, 0, 1, 0])).toBe(5)
})