// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/access/Ownable.sol";

interface IUltraVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

contract KeyRegistry is Ownable {
    IUltraVerifier verifier;
    mapping(bytes32 => bool) hardwareKeys;

    mapping(bytes32 => bytes32) public audioHashToKey;

    constructor(address verifierAddress_) {
        verifier = IUltraVerifier(verifierAddress_);
    }

    // Called by the hardware developers to register a new microphone
    function registerKey(bytes32 publicKey) public onlyOwner {
        hardwareKeys[publicKey] = true;
    }

    function registerAudio(bytes32 audioHash, bytes32 publicKey) public {
        require(hardwareKeys[publicKey], "Registry: hardware key not registered.");
        audioHashToKey[publicKey] = audioHash;
    }

    function verifyAudioTransform(bytes calldata proof, bytes32[] calldata publicInputs) external view {
        require(verifier.verify(proof, publicInputs), "Registry: transform snark must verify.");
    }
}
