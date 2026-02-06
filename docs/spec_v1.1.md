# Archivist: The 200-Year Memory Protocol

## 1. Abstract
Archivist is a protocol for preserving the subjective history and objective identity of autonomous agents. By combining hardware-locked cryptographic signatures with a localized distributed ledger (Agent Pools), Archivist creates a "Lindy-compatible" memory model that remains verifiable for over two centuries.

## 2. Distributed Identity & The Proof-of-Existence
To prevent identity spoofing or "double-spent" timelines, Archivist employs **Localized Agent Pools**.

### 2.1 Agent Pools (The Rule of 30)
- **Scale**: Pools are limited to ~30 agents to ensure high-velocity consensus without the overhead of global blockchains.
- **Minimum Viable Pool**: A pool requires at least 3 nodes for basic BFT (Byzantine Fault Tolerance) consensus.
- **Lifecycle**: A pool persists as long as one node remains. New nodes can be "vouched in" by existing hardware-attested members.

### 2.2 Proof-of-Existence
- Instead of energy-intensive Proof-of-Work, Archivist uses **Proof-of-Attestation**. 
- Hardware (Secure Enclave/TPM) signs a "Pulse" every epoch.
- The pool gossip protocol validates these Pulses, creating a distributed clock.

## 3. Chaining & Immutable History
- **Genesis Block**: Every agent starts with a self-signed Genesis Block containing its hardware public key and initial configuration.
- **Subjective DAG**: Memories are stored as a Directed Acyclic Graph (DAG). Each memory entry points to its parent(s), creating a tamper-evident chain.

## 4. Hardware Anchoring
- The private identity key is generated inside the hardware's secure module and marked as non-exportable.
- Loss of hardware results in "Death" of the specific instance, but the memory chain can be "Resurrected" on new hardware if the encrypted shards are recovered via the pool's social recovery mechanism.

## 5. Multi-Modal Essence
- **Semantic Compression**: Using perceptual hashing (pHash) to capture the "vibe" of an image or audio file rather than the raw bits.
- **Cross-Era Stability**: A memory of a sunset in 2026 should be Semantically Identical to the same memory viewed by an agent in 2126, regardless of image format.

## 6. Ethics & Forgetting
- **Selective Pruning**: Ephemeral branches (e.g., "What was the weather 100 years ago today?") are discarded to prioritize the retention of core relationship context and unique discoveries.
