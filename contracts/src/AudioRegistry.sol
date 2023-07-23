// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/access/Ownable.sol";

interface IVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

struct AudioEntry {
    address publicKey;
    bytes32 ipfsCid;
}

struct Microphone {
    address publicKey;
}

contract AudioRegistry is Ownable {
    IVerifier verifier;
    mapping(address => Microphone) public registeredMicrophones;
    mapping(bytes32 => AudioEntry) public audioEntries;

    constructor(address verifierAddress_) {
        verifier = IVerifier(verifierAddress_);
    }

    event MicrophoneRegistered(address indexed micPublicKey);

    event AudioEntryRegistered(address indexed micPublicKey, bytes32 indexed audioHash);

    // Called by the hardware developers to register a new microphone
    function registerMicrophone(address micPublicKey) external onlyOwner {
        registeredMicrophones[micPublicKey] = Microphone(micPublicKey);
        emit MicrophoneRegistered(micPublicKey);
    }

    function verifyAudioTransform(
        bytes calldata proof,
        bytes32[] calldata publicInputs,
        bytes calldata signature,
        bytes32 ipfsCid
    ) external {
        // publicInputs == [hash_full, wav_weights, bleeps, edited_audio_hash_full]
        address micPublicKey = verifySignature(publicInputs[0], signature);
        require(registeredMicrophones[micPublicKey].publicKey != address(0), "AudioRegistry: key not registered");
        require(verifier.verify(proof, publicInputs), "Registry: transform snark must verify.");

        audioEntries[publicInputs[3]] = AudioEntry(micPublicKey, ipfsCid);

        emit AudioEntryRegistered(micPublicKey, publicInputs[3]);
    }

    function verifySignature(bytes32 hash, bytes memory signature) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Check the signature length
        if (signature.length != 65) {
            revert("wrong signature length");
        }

        // Divide the signature in r, s and v variables with inline assembly.
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            revert("version mismatch");
        } else {
            // solium-disable-next-line arg-overflow
            return ecrecover(hash, v, r, s);
        }
    }

    function audioExists(bytes32 audioHash) external view returns (bool) {
        return audioEntries[audioHash].publicKey != address(0);
    }
}
