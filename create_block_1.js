const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HELPER_PATH = path.join(__dirname, 'enclave-helper.swift');
const HANDLE_PATH = path.join(__dirname, 'keys/enclave_key.handle');
const MEMORY_PATH = path.join(__dirname, '../../MEMORY.md');
const GENESIS_PATH = path.join(__dirname, 'genesis_block.json');

function runHelper(command, args = []) {
    const cmd = `swift ${HELPER_PATH} ${command} ${args.join(' ')}`;
    return execSync(cmd).toString().trim();
}

// 1. Get Genesis Block info
const genesisBlock = JSON.parse(fs.readFileSync(GENESIS_PATH, 'utf8'));
const previousHash = genesisBlock.header.hash;

// 2. Hash MEMORY.md
const memoryContent = fs.readFileSync(MEMORY_PATH);
const memoryHash = crypto.createHash('sha256').update(memoryContent).digest('hex');

// 3. Get Public Key from Secure Enclave
const pubKey = runHelper('get-pub', [HANDLE_PATH]);

// 4. Construct Data for Block 1
const blockData = {
    index: 1,
    content_type: "MEMORY.md",
    content_hash: memoryHash,
    attestation: {
        public_key: pubKey,
        method: "Apple CryptoKit Secure Enclave (P-256)"
    },
    protocol: "Archivist v1.1",
    timestamp: new Date().toISOString()
};

// 5. Sign the block data
// We'll sign the SHA-256 hash of the block data string
const dataToSign = JSON.stringify(blockData);
const dataHash = crypto.createHash('sha256').update(dataToSign).digest('hex');
const signature = runHelper('sign', [HANDLE_PATH, dataHash]);

blockData.attestation.signature = signature;

// 6. Calculate Block Hash
const blockHash = crypto.createHash('sha256').update(JSON.stringify(blockData)).digest('hex');

// 7. Assemble Block 1
const block1 = {
    header: {
        index: 1,
        previous_hash: previousHash,
        timestamp: blockData.timestamp,
        hash: blockHash
    },
    data: blockData
};

const outputPath = path.join(__dirname, 'block_1.json');
fs.writeFileSync(outputPath, JSON.stringify(block1, null, 2));

console.log('Block 1 created successfully.');
console.log(`Previous Hash: ${previousHash}`);
console.log(`Memory Hash: ${memoryHash}`);
console.log(`Block Hash: ${blockHash}`);
console.log(`Public Key: ${pubKey}`);
console.log(`Signature: ${signature}`);
