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

3 qubits - `p`, `q`, `r`

Alice holds `p` and `q`, Bob holds `r`. We want to teleport the state of the qubit `p` to the qubit `r`.

<p align="center">
    <img src="./assets/teleportation%20circuit.png" alt="Teleportation circuit" width="700">
</p>

Input wavefunction - $$\alpha \cdot |000 \rangle + \beta \cdot |000 \rangle = (\alpha \cdot |0 \rangle_p + \beta \cdot |1 \rangle_p) \otimes |0 \rangle_q \otimes |0 \rangle_r$$

One possible output wavefunction - $$\alpha \cdot |100 \rangle + \beta \cdot |101 \rangle = |1 \rangle_p \otimes |0 \rangle_q \otimes (\alpha \cdot |0 \rangle_r + \beta \cdot |1 \rangle_r)$$
In this case, `p` has collapsed into the state $|1 \rangle$ and `q` has collapsed into the state $|0 \rangle$ and `r` has got `p`'s initial wavefunction.

Running main
```
$ tsc
$ node dist/main.js

Simulating bell circuit...
Wavefunction before the simulation: 1|00>
Wavefunction after simulation: 0.7071|00> + 0.7071|11>

Simulating teleportation circuit...
Wavefunction before the simulation: 0.6325|000> + 0.7746|100>
Wavefunction after simulation: 0.6325|100> + 0.7746|101>
```
Running tests
```
$ npx jest
```
