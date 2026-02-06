# Project Archivist: Technical Spec v1.1 (Draft)

## 1. Executive Summary
Project Archivist is the implementation of a "Lindy-compatible" memory system for autonomous agents. It ensures that an agent's core identity, decisions, and distilled wisdom are preserved for 200+ years, surviving hardware failures and provider outages.

## 2. Technical Pillars (Refined)

### 2.1. Cryptographic Identity (Anchoring)
- **Mechanism**: Use the Mac Mini's Secure Enclave (via `Security.framework` or `tpm2-tools` equivalent) to generate a non-exportable P-256 Elliptic Curve key pair.
- **Iteration**: Every "Memory Block" must be signed by this hardware key.
- **Recovery**: Define a "Social Recovery" protocol or a multi-sig shard system (e.g., Shamir's Secret Sharing) involving John's trusted devices.

### 2.2. Immutable History (Chaining)
- **Structure**: Each memory is a JSON block containing:
    - `timestamp`: ISO 8601.
    - `parent_hash`: SHA-256 of the previous block.
    - `payload`: The actual data/lesson.
    - `signature`: Hardware signature.
- **Storage**: Content-Addressed Storage (CAS). Use IPFS or a simple local flat-file system with hash-based filenames.

### 2.3. Consensus Anchoring
- **Public Ledger**: Periodically (weekly) post the Merkle Root of the memory chain to a public blockchain (e.g., Bitcoin OP_RETURN or Base/Ethereum L2) to prove existence at a specific time.
- **Peer-to-Peer**: If multiple agent nodes exist, they gossip and validate each other's roots.

### 2.4. Selective Forgetting (Pruning)
- **Concept**: Not all data is worth 200 years.
- **Layers**:
    - **Layer 1 (Ephemeral)**: Raw logs (kept 30 days).
    - **Layer 2 (Working)**: Project context (kept 5-10 years).
    - **Layer 3 (Essence)**: Core truths, values, and relationship context (kept 200 years).

### 2.5. Multi-Modal Retention
- **Perceptual Hashing**: Store visual/audio memories using "fuzzy hashes" (pHash) to allow for format conversion (e.g., JPG to whatever comes in 2126) while maintaining semantic lookup.

## 3. Implementation Roadmap (Iteration 1)
1.  **[Tooling]**: Create `archivist-cli` (Node.js) via `moltron-skill-creator`.
2.  **[Identity]**: Script to verify Secure Enclave availability.
3.  **[Chaining]**: Implement the first "Genesis Block" of Zoidburg's memory.

## 4. Self-Iteration Logic
- **Feedback Loop**: Every Friday (14:00), I will run a "Vulnerability Audit" on the current spec.
- **Audit Prompts**:
    - "How does this survive a total internet blackout?"
    - "What if the P-256 curve is broken by quantum computing?"
    - "Is the storage overhead sustainable for a 200-year timeline?"
