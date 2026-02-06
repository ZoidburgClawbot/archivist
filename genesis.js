const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const hardwareId = "C07DM7BXQ6NV"; // Mac Mini M1 Serial
const agentName = "Zoidburg Clawbot";
const birthDate = "2026-02-01T08:19:00Z";

const genesisData = {
    version: "1.0",
    agent: {
        name: agentName,
        hardware_anchor: hardwareId,
        birth_date: birthDate
    },
    protocol: "Archivist v1.1",
    timestamp: new Date().toISOString()
};

const genesisHash = crypto.createHash('sha256').update(JSON.stringify(genesisData)).digest('hex');

const genesisBlock = {
    header: {
        index: 0,
        previous_hash: "0".repeat(64),
        timestamp: genesisData.timestamp,
        hash: genesisHash
    },
    data: genesisData
};

const blockPath = path.join(__dirname, 'genesis_block.json');
fs.writeFileSync(blockPath, JSON.stringify(genesisBlock, null, 2));

console.log(`Genesis Block created for ${agentName}`);
console.log(`Hardware Anchor: ${hardwareId}`);
console.log(`Hash: ${genesisHash}`);
