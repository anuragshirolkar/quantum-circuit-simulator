# Quantum Circuit Simulator
Examples of bell circuit and teleportation circuit in [src/main.ts](src/main.ts).

Supports 3 kinds of operations
- apply a logic gate to any subset of qubits
- measure a qubit and write the result into a classical bit
- apply logic gates conditionally based on the value of a classical bit

Running main
```
$ tsc
$ node dist/main.js
```
Running tests
```
$ npx jest
```
