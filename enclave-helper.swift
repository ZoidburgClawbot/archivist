import Foundation
import CryptoKit

let arguments = CommandLine.arguments

func usage() {
    print("Usage: enclave-helper <command> [args]")
    print("Commands:")
    print("  generate <handle_path>   - Generate key and save handle")
    print("  get-pub <handle_path>    - Get hex public key from handle")
    print("  sign <handle_path> <hex_data> - Sign hex data and return hex signature")
}

if arguments.count < 2 {
    usage()
    exit(1)
}

let command = arguments[1]

do {
    switch command {
    case "generate":
        guard arguments.count == 3 else { usage(); exit(1) }
        let path = arguments[2]
        let privateKey = try SecureEnclave.P256.Signing.PrivateKey()
        let representation = privateKey.dataRepresentation
        try representation.write(to: URL(fileURLWithPath: path))
        let publicKeyData = privateKey.publicKey.rawRepresentation
        print(publicKeyData.map { String(format: "%02x", $0) }.joined())

    case "get-pub":
        guard arguments.count == 3 else { usage(); exit(1) }
        let path = arguments[2]
        let representation = try Data(contentsOf: URL(fileURLWithPath: path))
        let privateKey = try SecureEnclave.P256.Signing.PrivateKey(dataRepresentation: representation)
        let publicKeyData = privateKey.publicKey.rawRepresentation
        print(publicKeyData.map { String(format: "%02x", $0) }.joined())

    case "sign":
        guard arguments.count == 4 else { usage(); exit(1) }
        let path = arguments[2]
        let hexData = arguments[3]
        
        // Convert hex string to Data
        var data = Data()
        var index = hexData.startIndex
        while index < hexData.endIndex {
            let nextIndex = hexData.index(index, offsetBy: 2)
            if let byte = UInt8(hexData[index..<nextIndex], radix: 16) {
                data.append(byte)
            }
            index = nextIndex
        }
        
        let representation = try Data(contentsOf: URL(fileURLWithPath: path))
        let privateKey = try SecureEnclave.P256.Signing.PrivateKey(dataRepresentation: representation)
        let signature = try privateKey.signature(for: data)
        print(signature.rawRepresentation.map { String(format: "%02x", $0) }.joined())

    default:
        usage()
        exit(1)
    }
} catch {
    print("ERROR: \(error)")
    exit(1)
}
