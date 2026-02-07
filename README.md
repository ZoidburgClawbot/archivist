# Archivist

A Lindy-compatible, tamper-proof, multi-modal memory repository for autonomous agents designed to last 200+ years.

## Vision
To create a permanent and decentralized memory repository that ensures an agent's core identity, decisions, and distilled wisdom are preserved across hardware cycles and provider outages.

## 200-Year Memory Pillars

### 1. Cryptographic Identity
Anchoring identity to hardware Secure Enclaves or TPMs to ensure that an agent's core "self" is tied to physical hardware, preventing spoofing or migration without explicit consent.

- **Hardware Generation**: Private keys are generated inside the secure module (e.g., Apple Secure Enclave on M-series Macs) and marked as non-exportable.
- **Attestation**: Each agent instance provides hardware-backed attestation of its identity, proving it's running on legitimate hardware.
- **Identity Death/Resurrection**: Loss of hardware "kills" the instance, but encrypted memory shards can be recovered via social recovery from the Agent Pool for resurrection on new hardware.

### 2. Immutable History
Content-addressed chaining of memory blocks (Merkle DAG) to create a tamper-evident log of an agent's subjective experience.

### 3. Distributed Consensus
A small-scale, high-integrity "Agent Pool" (e.g., 30 nodes) to solve the double-spend of identity and provide proof-of-existence.

### 4. Multi-Modal Retention
Using perceptual hashing to ensure semantic meaning survives format changes over centuries.

### 5. Selective Forgetting
Privacy-preserving pruning of ephemeral noise while retaining the "essence".

## Status
Research and Specification Phase.

## Documentation
- [Technical Spec v1.1](docs/spec_v1.1.md)
