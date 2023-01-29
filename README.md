# Quantum Circuit Simulator

Supports 3 kinds of operations
- apply a logic gate to any subset of qubits
- measure a qubit and write the result into a classical bit
- apply logic gates conditionally based on the value of a classical bit

# Main.ts

Examples of bell circuit and teleportation circuit in [src/main.ts](src/main.ts).

## Bell circuit

<p align="center">
    <img src="./assets/bell%20circuit.png" alt="Bell Circuit" width="300">
</p>

Input wavefunction - $1 \cdot |00 \rangle$

Output wavefunction - $$\dfrac{|00 \rangle + |11 \rangle}{\sqrt{2}} = 0.7071 \cdot |00\rangle + 0.7071 \cdot |11\rangle$$

## Teleportation circuit

3 qubits - p, q, r
Alice holds p and q, Bob holds r. We want to teleport the state of the qubit p to the qubit r.

<p align="center">
    <img src="./assets/teleportation%20circuit.png" alt="Teleportation circuit" width="700">
</p>

Input wavefunction - $$\alpha \cdot |000 \rangle + \beta \cdot |000 \rangle = |00 \rangle_{pq} \otimes (\alpha \cdot |0 \rangle_r + \beta \cdot |1 \rangle_r)$$

One possible output wavefunction - $$\alpha \cdot |000 \rangle + \beta \cdot |101 \rangle = |0 \rangle_q \otimes (\alpha \cdot |00 \rangle_{pr} + \beta \cdot |11 \rangle_{pr}$$

Running main
```
$ tsc
$ node dist/main.js

Simulating bell circuit...
Wavefunction before the simulation: 1|00>
Wavefunction after simulation: 0.7071|00> + 0.7071|11>

Simulating teleportation circuit...
Wavefunction before the simulation: 0.6325|000> + 0.7746|001>
Wavefunction after simulation: 0.6325|001> + 0.7746|101>
```
Running tests
```
$ npx jest
```
