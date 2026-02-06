const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const HELPER_PATH = path.join(__dirname, 'enclave-helper.swift');
const HANDLE_PATH = path.join(__dirname, 'keys/enclave_key.handle');

function runHelper(command, args = []) {
    try {
        const cmd = `swift ${HELPER_PATH} ${command} ${args.join(' ')}`;
        return execSync(cmd).toString().trim();
    } catch (err) {
        console.error(`Error running helper: ${err.message}`);
        process.exit(1);
    }
}

console.log('--- Archivist Secure Enclave Attestation ---');

if (!fs.existsSync(HANDLE_PATH)) {
    console.log('No key handle found. Generating new hardware-bound key...');
    const pubKey = runHelper('generate', [HANDLE_PATH]);
    console.log(`Generated Public Key: ${pubKey}`);
} else {
    console.log('Found existing key handle.');
    const pubKey = runHelper('get-pub', [HANDLE_PATH]);
    console.log(`Hardware Public Key: ${pubKey}`);
}

// Demonstrate signing
const testMessageHex = '48656c6c6f20417263686976697374'; // "Hello Archivist"
console.log(`Signing test message (hex): ${testMessageHex}`);
const signature = runHelper('sign', [HANDLE_PATH, testMessageHex]);
console.log(`Signature: ${signature}`);

console.log('--- Attestation Complete ---');
